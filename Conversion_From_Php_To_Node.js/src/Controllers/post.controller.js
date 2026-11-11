
import asynchandler from "../Utils/Asynchandler.js";
import prisma from "../lib/prisma.js";
import cloudinary from "../Utils/Cloudinary.js";

const AddPost = asynchandler(async (req, res) => {

    // 1. Receive FormData fields
    const {
        title,
        summary,
        content,
        userid,
        "Frontend-Id": frontendId,
        date
    } = req.body;

    // 2. Receive Image from Multer
    const imageFile = req.file;

    // 3. Validate Required Fields
    if (
        !title ||
        !summary ||
        !content ||
        !userid ||
        !frontendId ||
        !date
    ) {
        return res.status(400).json({
            status: false,
            message: "All fields are required"
        });
    }

    // 4. Validate Image
    if (!imageFile) {
        return res.status(400).json({
            status: false,
            message: "Image is required"
        });
    }

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg"
    ];

    if (!allowedTypes.includes(imageFile.mimetype)) {
        return res.status(400).json({
            status: false,
            message: "Invalid image format"
        });
    }

    // 5. Upload Image to Cloudinary
    const uploadImage = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "Blog_Posts",
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        stream.end(imageFile.buffer);
    });

    // 6. Get Cloudinary Image URL
    const imageUrl = uploadImage.secure_url;

    // 7. Insert Post into Database
    const post = await prisma.blogdetails.create({
    data: {
        User_Id: Number(userid),
        Frontend_Id: String(frontendId),
        TITLE: title.trim(),
        SUMMARY: summary.trim(),
        CONTENT: content,
        IMAGE: imageUrl,
        date: date
    }
});

    // 8. Send Success Response
    return res.status(201).json({
        status: true,
        message: "Post added successfully",
        id: post.id,
        userid: userid,
        frontendid: frontendId,
        image: imageUrl
    });

});



const Updatepost = asynchandler(async (req, res) => {

    // 1. Receive FormData fields
    const {
        title,
        summary,
        content,
        userid,
        "Frontend-Id": frontendId,
        date
    } = req.body;

    // 2. Receive Image from Multer
    const imageFile = req.file;

    console.log("Received FormData:", req.body);
    console.log("Received Image:", imageFile);

    // 3. Validate Required Fields
    if (
        !title ||
        !summary ||
        !content ||
        !userid ||
        !frontendId ||
        !date
    ) {
        return res.status(400).json({
            status: false,
            message: "All fields are required"
        });
    }

    // 4. Validate User ID
    const parsedUserId = Number(userid);

    if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
        return res.status(400).json({
            status: false,
            message: "Invalid user ID"
        });
    }

    // 5. Keep Existing Image URL
    let imageUrl;

    // 6. Upload New Image Only If Provided
    if (imageFile) {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg"
        ];

        if (!allowedTypes.includes(imageFile.mimetype)) {
            return res.status(400).json({
                status: false,
                message: "Invalid image format"
            });
        }

        const uploadImage = await new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "Blog_Posts",
                    resource_type: "image"
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            stream.end(imageFile.buffer);
        });

        imageUrl = uploadImage.secure_url;
    }

    // 7. Update Post in Database
    console.log("Updating Post with User ID:", parsedUserId, "Frontend ID:", frontendId, "Date:", date);
    const updatedPost = await prisma.blogdetails.updateMany({
        where: {
            User_Id: parsedUserId,
            Frontend_Id: frontendId,
            
        },
        data: {
            TITLE: title.trim(),
            SUMMARY: summary.trim(),
            CONTENT: content,
            ...(imageUrl && { IMAGE: imageUrl })
        }
    });

    // 8. Check Whether Post Exists
    if (updatedPost.count === 0) {
        return res.status(404).json({
            status: false,
            message: "Post not found"
        });
    }

    // 9. Send Success Response
    return res.status(200).json({
        status: true,
        message: "Post updated successfully",
        image: imageUrl
    });

});




const Getpost = asynchandler(async (req, res) => {

    // 1. Get All Blog Posts
    const posts = await prisma.blogdetails.findMany();

    // 2. Check Whether Posts Exist
    if (posts.length === 0) {
        return res.status(200).json([]);
    }

    // 3. Send Posts
    return res.status(200).json(posts);

});


export { AddPost, Updatepost, Getpost };
