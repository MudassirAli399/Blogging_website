
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { login, UpdateDataOfBlogs } from "../store/Slice.js";
import PostCard from "../components/Elements/PostCard";

export default function Postdetails() {

    // Get All Blog Posts From Redux
    const Posts = useSelector(
        (state) => state.user.DataOfBlogs
    );

    const dispatch = useDispatch();

    // Logged-in User ID
    const userId = useSelector(
        (state) => state.user.Authentication.id
    );

    // Loader
    const loader = useSelector(
        (state) => state.user.Authentication.loader
    );

    // Fetch Trigger
    const StartFetch = useSelector(
        (state) => state.user.Authentication.StartFetch
    );

    // Fetch Blog Posts
    React.useEffect(() => {

        if (!userId || !StartFetch) {
            return;
        }

        const GetPosts = async () => {

            try {

                dispatch(login({ loader: true }));

                const response = await fetch(
                    import.meta.env.VITE_GET_POST,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const data = await response.json();

                console.log("Data from getting posts:", data);

                if (!response.ok) {

                    throw new Error(
                        data.message || "Unable to fetch blog posts"
                    );

                }

                // Store All Blog Posts In Redux
                dispatch(UpdateDataOfBlogs(data));

            } catch (error) {

                console.error("Get Posts Error:", error);

            } finally {

                dispatch(login({
                    loader: false,
                    StartFetch: false
                }));

            }

        };

        GetPosts();

    }, [userId, StartFetch, dispatch]);


    // Authentication Check
    if (!userId) {

        return (
            <center>
                <h1 style={{ color: "red" }}>
                    You are not logged in
                </h1>
            </center>
        );

    }


    return (

        <>

            <div className="container">

                <div className="row">

                    {Posts && Posts.length > 0 && Posts.map((post) => {

                        // Check Whether This Post Belongs To Logged-in User
                        const isMyPost =
                            String(post.User_Id) === String(userId);

                        return (

                            <PostCard

                                key={post.Frontend_Id}

                                // Blog's Unique Frontend ID
                                id={post.Frontend_Id}

                                // Blog Image
                                image={post.IMAGE}

                                // Blog Information
                                Title={post.TITLE}

                                Summary={post.SUMMARY}

                                Content={post.CONTENT}

                                date={post.date}

                                // Show Edit/Delete Buttons Only For Owner
                                button={isMyPost}

                            />

                        );

                    })}

                </div>


                {/* Loading Indicator */}

                {loader && (

                    <center>
                        <h1>Loading...</h1>
                    </center>

                )}


                {/* No Posts Available */}

                {!loader && (!Posts || Posts.length === 0) && (

                    <center>
                        <h2>No Blog Posts Available</h2>
                    </center>

                )}

            </div>

        </>

    );

}
