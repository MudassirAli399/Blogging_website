
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
    console.log("Received FormData:", req.body);
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
        date,
        dateforupdate,
        imageforupdate
    } = req.body;

    // 2. Receive uploaded image
    const imageFile = req.file;

    console.log("Received FormData:", req.body);
    console.log("Received Image:", imageFile);

    // 3. Validate required fields
    if (
        !title?.trim() ||
        !summary?.trim() ||
        !content?.trim() ||
        !userid ||
        !frontendId ||
        !date ||
        !dateforupdate ||
        !imageforupdate
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

    // 5. Search existing post using original values
    const existingPost = await prisma.blogdetails.findFirst({
        where: {
            date: dateforupdate,
            IMAGE: imageforupdate
        }
    });

    if (!existingPost) {
        return res.status(404).json({
            status: false,
            message: "Post not found or original post data has changed"
        });
    }

    // 6. Keep existing image if no new image is uploaded
    let imageUrl = imageforupdate;

    // 7. Upload new image only if provided
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

    // 8. Update post in database
    const updatedPost = await prisma.blogdetails.updateMany({
        where: {
            date: dateforupdate,
            IMAGE: imageforupdate
        },
        data: {
            TITLE: title.trim(),
            SUMMARY: summary.trim(),
            CONTENT: content,
            IMAGE: imageUrl,
            date: date
        }
    });

    // 9. Check update result
    if (updatedPost.count === 0) {
        return res.status(404).json({
            status: false,
            message: "Post could not be updated"
        });
    }

    // 10. Success response
    return res.status(200).json({
        status: true,
        message: "Post updated successfully",
        image: imageUrl,
        date: date
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


const Deletepost = asynchandler(async (req, res) => {

    // 1. Receive data from frontend
    const { Date  } = req.body;

    

    // 2. Validate required fields
    if (!Date) {
        return res.status(400).json({
            status: false,
            message: "All fields are required"
        });
    }

    // 3. Validate User ID
   

   

    // 4. Delete post from database
    const deletedPost = await prisma.blogdetails.deleteMany({
        where: {            
            date: Date, 
        }
    });

    // 5. Check whether post was deleted
    if (deletedPost.count === 0) {
        return res.status(404).json({
            status: false,
            message: "Post not found"
        });
    }

    // 6. Success response
    return res.status(200).json({
        status: true,
        message: "Post deleted successfully",
        date: Date,
        result: deletedPost.count
    });

});


const Searchpost = asynchandler(async (req, res) => {

    // 1. Receive JSON data from frontend
    const {
        TitleForSearch,
        IncrementNumber = 0
    } = req.body;

    console.log("Search Request:", req.body);

    // 2. Validate search title
    const title = typeof TitleForSearch === "string"
        ? TitleForSearch.trim()
        : "";

    if (title === "") {
        return res.status(200).json([]);
    }

    // 3. Validate pagination number
    const parsedIncrement = Number(IncrementNumber);

    if (
        (typeof IncrementNumber !== "number" &&
         typeof IncrementNumber !== "string") ||
        !Number.isSafeInteger(parsedIncrement) ||
        parsedIncrement < 0
    ) {
        return res.status(400).json({
            status: false,
            message: "Invalid pagination number"
        });
    }

    // 4. Calculate limit and offset
    const Limit = 5;
    const Offset = parsedIncrement * Limit;

    // 5. Search posts using partial title matching
    const posts = await prisma.blogdetails.findMany({
        where: {
            TITLE: {
                contains: title
            }
        },
        orderBy: {
            ID: "desc"
        },
        skip: Offset,
        take: Limit
    });

    // 6. Return matching posts
    return res.status(200).json(posts);

});


export { AddPost, Updatepost, Getpost,Deletepost,Searchpost };
