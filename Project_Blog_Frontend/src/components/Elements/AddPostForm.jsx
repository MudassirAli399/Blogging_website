
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { updateblogpost, login } from "../../store/Slice";

import Input from "./Input.jsx";
import Button from "./Button.jsx";
import RTE from "./RTE.jsx";

export default function AddPostForm({
    URL = import.meta.env.VITE_ADD_POST
}) {

    const loader = useSelector(
        (state) => state.user.Authentication.loader
    );

    const dispatch = useDispatch();

    const id = useSelector(
        (state) => state.user.Authentication.id
    );

    const BlogValue = useSelector(
        (state) => state.user.BlogPost
    );

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            usertitle: BlogValue.title || "",
            userSummary: BlogValue.Summary || "",
            content: BlogValue.Content || "",
            userImage: null
        }
    });

    React.useEffect(() => {
        reset({
            usertitle: BlogValue.title || "",
            userSummary: BlogValue.Summary || "",
            content: BlogValue.Content || "",
            userImage: null
        });
    }, [BlogValue, reset]);

    const Submit = async (data) => {

        try {

            dispatch(login({ loader: true }));

            if (!data.userImage || !data.userImage[0]) {
                alert("Please select an image.");
                return;
            }

            const date = new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

            const formData = new FormData();

            formData.append("userid", id);
            formData.append("Frontend-Id", crypto.randomUUID());
            formData.append("title", data.usertitle.trim());
            formData.append("summary", data.userSummary.trim());
            formData.append("content", data.content);
            formData.append("date", date);
            formData.append("image", data.userImage[0]);

            const res = await fetch(URL, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const result = await res.json();

            if (res.ok && result.status) {

                alert(result.message);

                dispatch(login({ StartFetch: true }));

                dispatch(updateblogpost({
                    title: "",
                    Summary: "",
                    Content: "",
                    Image: "",
                    Date: ""
                }));

                reset({
                    usertitle: "",
                    userSummary: "",
                    content: "",
                    userImage: null
                });

            } else {
                alert(result.message || "Something went wrong.");
            }

        } catch (error) {

            console.error("Add Post Error:", error);
            alert("Unable to add post. Please try again.");

        } finally {
            dispatch(login({ loader: false }));
        }
    };

    const errorStyle = {
        color: "#dc2626",
        fontSize: "13px",
        marginLeft: "20%",
        marginTop: "6px",
        lineHeight: "1.5"
    };

    if (!id) {
        return (
            <div style={{
                minHeight: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                boxSizing: "border-box"
            }}>
                <div style={{
                    maxWidth: "450px",
                    width: "100%",
                    padding: "clamp(20px, 5vw, 35px)",
                    textAlign: "center",
                    background: "#ffffff",
                    borderRadius: "16px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    boxSizing: "border-box"
                }}>
                    <div style={{ fontSize: "42px", marginBottom: "15px" }}>
                        🔒
                    </div>

                    <h2 style={{ color: "#202938", marginBottom: "10px" }}>
                        Login Required
                    </h2>

                    <p style={{
                        color: "#6b7280",
                        lineHeight: "1.6",
                        margin: 0
                    }}>
                        Please login to your account before creating a blog post.
                    </p>
                </div>
            </div>
        );
    }

    return (

        <div style={{
            minHeight: "100vh",
            width: "100%",
            background: "#f4f6fb",
            padding: "clamp(18px, 4vw, 45px) clamp(12px, 4vw, 24px) 60px",
            boxSizing: "border-box"
        }}>

            <div style={{
                width: "100%",
                maxWidth: "950px",
                margin: "0 auto",
                boxSizing: "border-box"
            }}>

                {/* Header */}

                <div style={{
                    background: "linear-gradient(120deg, #172554, #2563eb)",
                    borderRadius: "18px",
                    padding: "clamp(22px, 5vw, 40px)",
                    marginBottom: "clamp(18px, 3vw, 30px)",
                    color: "#ffffff",
                    boxShadow: "0 10px 25px rgba(37,99,235,0.16)",
                    boxSizing: "border-box"
                }}>

                    <div style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        letterSpacing: "2px",
                        color: "#bfdbfe",
                        marginBottom: "12px"
                    }}>
                        BLOGGING DASHBOARD
                    </div>

                    <h1 style={{
                        fontSize: "clamp(25px, 5vw, 36px)",
                        fontWeight: "800",
                        margin: "0 0 12px",
                        lineHeight: "1.2"
                    }}>
                        Create Your Story
                    </h1>

                    <p style={{
                        fontSize: "clamp(13px, 2vw, 15px)",
                        color: "#dbeafe",
                        margin: 0,
                        lineHeight: "1.7",
                        maxWidth: "600px"
                    }}>
                        Share your knowledge, express your ideas and
                        publish something valuable for your readers.
                    </p>

                </div>

                {/* Form Card */}

                <div style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "clamp(18px, 4vw, 40px)",
                    boxShadow: "0 8px 35px rgba(15,23,42,0.06)",
                    border: "1px solid #e9edf5",
                    width: "100%",
                    boxSizing: "border-box",
                    minWidth: 0
                }}>

                    <div style={{
                        marginBottom: "30px",
                        borderBottom: "1px solid #edf0f5",
                        paddingBottom: "20px"
                    }}>

                        <h2 style={{
                            fontSize: "clamp(19px, 3vw, 22px)",
                            fontWeight: "750",
                            color: "#202938",
                            margin: "0 0 8px"
                        }}>
                            Blog Information
                        </h2>

                        <p style={{
                            color: "#8490a3",
                            fontSize: "14px",
                            margin: 0,
                            lineHeight: "1.6"
                        }}>
                            Fill in the details below to publish your blog.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit(Submit)}
                        style={{ width: "100%", minWidth: 0 }}
                    >

                        {/* Title */}

                        <div style={{ marginBottom: "25px", minWidth: 0 }}>

                            <Input
                                label="Blog Title"
                                type="text"
                                placeholder="Enter an attractive blog title"
                                name="usertitle"
                                classname="inputforposttitle"
                                divid="divforpost"
                                labelid="labelforpost"
                                {...register("usertitle", {
                                    required: "Title is required",
                                    minLength: {
                                        value: 3,
                                        message: "Title must contain at least 3 characters"
                                    }
                                })}
                            />

                            {errors.usertitle && (
                                <p style={errorStyle}>
                                    {errors.usertitle.message}
                                </p>
                            )}

                        </div>

                        {/* Summary */}

                        <div style={{ marginBottom: "25px", minWidth: 0 }}>

                            <Input
                                label="Short Summary"
                                type="text"
                                placeholder="Write a short description of your blog"
                                name="userSummary"
                                classname="inputforpostsummary"
                                divid="divforpost"
                                labelid="labelforpost"
                                {...register("userSummary", {
                                    required: "Summary is required",
                                    minLength: {
                                        value: 10,
                                        message: "Summary must contain at least 10 characters"
                                    }
                                })}
                            />

                            {errors.userSummary && (
                                <p style={errorStyle}>
                                    {errors.userSummary.message}
                                </p>
                            )}

                        </div>

                        {/* Image */}

                        <div style={{
                            marginBottom: "25px",
                            padding: "clamp(14px, 3vw, 22px)",
                            background: "#f8faff",
                            border: "1px dashed #cbd5e1",
                            borderRadius: "12px",
                            boxSizing: "border-box",
                            minWidth: 0
                        }}>

                            <h3 style={{
                                fontSize: "16px",
                                color: "#253047",
                                margin: "0 0 6px"
                            }}>
                                Featured Image
                            </h3>

                            <p style={{
                                fontSize: "13px",
                                color: "#8490a3",
                                margin: "0 0 15px",
                                lineHeight: "1.6"
                            }}>
                                Upload a JPG, JPEG or PNG image for your blog.
                            </p>

                            <Input
                                label="Choose Image"
                                type="file"
                                placeholder="Select Your Blog Image"
                                name="userImage"
                                classname="inputforpostimage"
                                divid="divforpost"
                                labelid="labelforpost"
                                accept="image/png, image/jpeg, image/jpg"
                                {...register("userImage", {
                                    required: "Please select a featured image",
                                    validate: {
                                        fileType: (files) =>
                                            !files?.[0] ||
                                            ["image/png", "image/jpeg"].includes(files[0].type) ||
                                            "Only PNG and JPG images are allowed",

                                        fileSize: (files) =>
                                            !files?.[0] ||
                                            files[0].size <= 5 * 1024 * 1024 ||
                                            "Image size must be less than 5 MB"
                                    }
                                })}
                            />

                            {errors.userImage && (
                                <p style={{
                                    ...errorStyle,
                                    marginLeft: 0
                                }}>
                                    {errors.userImage.message}
                                </p>
                            )}

                            <p style={{
                                color: "#94a3b8",
                                fontSize: "12px",
                                margin: "12px 0 0",
                                lineHeight: "1.5"
                            }}>
                                Recommended: High-quality image, maximum 5 MB.
                            </p>

                        </div>

                        {/* Content */}

                        <div style={{
                            marginTop: "30px",
                            marginBottom: "30px",
                            width: "100%",
                            minWidth: 0
                        }}>

                            <h3 style={{
                                fontSize: "17px",
                                fontWeight: "700",
                                color: "#242938",
                                margin: "0 0 7px"
                            }}>
                                Blog Content
                            </h3>

                            <p style={{
                                fontSize: "13px",
                                color: "#8490a3",
                                margin: "0 0 14px",
                                lineHeight: "1.6"
                            }}>
                                Write your complete blog article below.
                            </p>

                            <div style={{
                                width: "100%",
                                minWidth: 0,
                                overflowWrap: "anywhere"
                            }}>
                                <Controller
                                    name="content"
                                    control={control}
                                    rules={{
                                        required: "Blog content is required",
                                        validate: (value) =>
                                            value?.replace(/<[^>]*>/g, "").trim().length > 0 ||
                                            "Blog content cannot be empty"
                                    }}
                                    render={({ field }) => (
                                        <RTE
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>

                            {errors.content && (
                                <p style={{
                                    ...errorStyle,
                                    marginLeft: 0
                                }}>
                                    {errors.content.message}
                                </p>
                            )}

                        </div>

                        {/* Submit */}

                        <div style={{
                            borderTop: "1px solid #edf0f5",
                            paddingTop: "25px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "15px",
                            flexWrap: "wrap",
                            width: "100%",
                            boxSizing: "border-box"
                        }}>

                            <p style={{
                                color: "#94a3b8",
                                fontSize: "13px",
                                lineHeight: "1.6",
                                margin: 0,
                                flex: "1 1 200px"
                            }}>
                                Make sure all information is correct before publishing.
                            </p>

                            <div style={{
                                width: "min(100%, 200px)",
                                flex: "1 1 200px"
                            }}>

                                {loader ? (

                                    <button
                                        type="button"
                                        disabled
                                        style={{
                                            width: "100%",
                                            minHeight: "48px",
                                            border: "none",
                                            borderRadius: "9px",
                                            background: "#94a3b8",
                                            color: "#ffffff",
                                            fontSize: "15px",
                                            fontWeight: "700",
                                            cursor: "not-allowed"
                                        }}
                                    >
                                        Publishing...
                                    </button>

                                ) : (

                                    <Button
                                        width="100%"
                                        marginTop="0px"
                                    />

                                )}

                            </div>

                        </div>

                    </form>

                </div>

                <p style={{
                    textAlign: "center",
                    color: "#94a3b8",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    marginTop: "25px"
                }}>
                    Create meaningful content. Share your knowledge with the world.
                </p>

            </div>

        </div>

    );
}
