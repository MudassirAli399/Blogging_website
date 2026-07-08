import React from "react"
import { set } from "react-hook-form";
import { useSelector } from "react-redux"
import PostCard from "../components/Elements/PostCard";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {UpdateSearchData,DataOfSearchingPost} from "../store/Slice";
import SearchPost from "../Backend/Search";
export default function Search({
    Blogs = []
}) {
    const [showingdata, setshowingdata] = React.useState([]);
    const dispatch = useDispatch();
    const DataOfSearchingPost = useSelector((state) => state.user.DataOfSearchingPost);
    const IsSearch = useSelector((state) => state.user.Search.IsUserSearch);
    const IsContentFind = useSelector((state) => state.user.Search.IsContentfind);
    const id = useSelector((state) => state.user.Authentication.id);
    const LoadMore = useSelector((state) => state.user.Search.ClickOnLoadMore);
    React.useEffect(() => {
        setshowingdata(DataOfSearchingPost)
    },[DataOfSearchingPost])
    const search = async () => {
        dispatch(UpdateSearchData({ IsUserSearch: true }));
        console.log("LoadMore will send at loadmore time:-- ",LoadMore);

     
        const response = await SearchPost({
          title: DataOfSearchingPost[0].TITLE,
          IncrementNumber: LoadMore
        });
    
        if (response) {
          console.log(response);
          dispatch(UpdateSearchData({
            increment: LoadMore + 1,
            IsContentfind: true
          }));
          dispatch(DataOfSearchingPost(response));
        } else {
        document.getElementById("loadmore").remove()
           console.log("error"); 
          dispatch(UpdateSearchData({
            increment: 0,
            IsContentfind: true
          }));
          
        }
      };
  
    return (
        IsSearch ? (
            IsContentFind ?( id ? (<div className="container" >
      <div className="row" >
                
      { showingdata.length>0 && showingdata.map((post) => {
        if(post.id == id){ return(
        
        <PostCard  image={`http://localhost/apicall/Project-Blog-Backend/${post.IMAGE}`} Title={post.TITLE} Summary={post.SUMMARY} button={true} Content={post.CONTENT} date={post.date} id={nanoid()} />
    
    )
        }
        else{
           
          return(<PostCard  image={`http://localhost/apicall/Project-Blog-Backend/${post.IMAGE}`} Title={post.TITLE} Summary={post.SUMMARY} button={false} Content={post.CONTENT} date={post.date} />)}
        
        } )}
  
      </div>
      
      {LoadMore > 0 && (
        <button onClick={search} id="loadmore">Load More</button>
      )}
     
   </div>) : (<h1>You are not logged in</h1>) ): (id ? (<h1>Loading</h1>) : (<h1>You are not logged in</h1>))

        ) : (<h1>You cannot visit this page directly.Please go to Search bar in header and search by title</h1>)

    )
}