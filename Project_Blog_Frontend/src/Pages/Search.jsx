
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import PostCard from "../components/Elements/PostCard";

import {
    UpdateSearchData,
    DataOfSearchingPost,
    login
} from "../store/Slice.js";

import SearchPost from "../Backend/Search.js";

export default function Search() {

    const dispatch = useDispatch();

    const loader = useSelector(
        (state) => state.user.Authentication.loader
    );

    const userId = useSelector(
        (state) => state.user.Authentication.id
    );

    const Posts = useSelector(
        (state) => state.user.DataOfSearchingPost
    );

    const IsSearch = useSelector(
        (state) => state.user.Search.IsUserSearch
    );

    const IsContentFind = useSelector(
        (state) => state.user.Search.IsContentfind
    );

    const LoadMore = useSelector(
        (state) => state.user.Search.ClickOnLoadMore
    );

    const SearchTerm = useSelector(
        (state) => state.user.Search.SearchTerm
    );

    // Load next page of search results.
    const search = async () => {

        if (!SearchTerm.trim() || loader) {
            return;
        }

        try {

            dispatch(login({ loader: true }));

            const response = await SearchPost({
                title: SearchTerm,
                IncrementNumber: LoadMore
            });

            if (response.length > 0) {

                dispatch(
                    DataOfSearchingPost({
                        firsttime: false,
                        data: response
                    })
                );

                dispatch(
                    UpdateSearchData({
                        increment: LoadMore + 1,
                        IsContentfind: true
                    })
                );

            } else {

                // No more records are available.
                dispatch(
                    UpdateSearchData({
                        increment: 0,
                        IsContentfind: true
                    })
                );

            }

        } catch (error) {

            console.error("Load More Error:", error);

        } finally {

            dispatch(login({ loader: false }));

        }
    };

    return (

        IsSearch ? (

            IsContentFind ? (

                <div className="container">

                    <div className="row">

                        {Posts.length > 0 ? (

                            Posts.map((post) => {

                                const isMyPost =
                                    String(post.User_Id) === String(userId);

                                return (

                                    <PostCard
                                        key={post.Frontend_Id}
                                        id={post.Frontend_Id}
                                        image={`https://blogging-website.site/${post.IMAGE}`}
                                        Title={post.TITLE}
                                        Summary={post.SUMMARY}
                                        button={isMyPost}
                                        Content={post.CONTENT}
                                        date={post.date}
                                    />

                                );

                            })

                        ) : (

                            <center>
                                <h2>No posts found for "{SearchTerm}"</h2>
                            </center>

                        )}

                    </div>

                    {loader && (
                        <center>
                            <h1>Loading...</h1>
                        </center>
                    )}

                    {LoadMore > 0 && Posts.length > 0 && (

                        <center>

                            <button
                                onClick={search}
                                disabled={loader}
                                id="loadmore"
                                style={{
                                    marginTop: "2%",
                                    borderRadius: "20px",
                                    height: "40px"
                                }}
                            >
                                {loader ? "Loading..." : "Load More"}
                            </button>

                        </center>

                    )}

                </div>

            ) : (

                <center>
                    <h1>Loading...</h1>
                </center>

            )

        ) : (

            <h1>
                You cannot visit this page directly.
                Please go to Search bar in header and search by title.
            </h1>

        )

    );
}
