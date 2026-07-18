import React from "react";
import {useSelector,useDispatch} from "react-redux"
import { login,UpdateDataOfBlogs } from "../store/Slice.js";
import PostCard from "../components/Elements/PostCard";
import { nanoid } from "@reduxjs/toolkit";

export default function Postdetails(){

  

  const Posts = useSelector((state) => state.user.DataOfBlogs);

  const dispatch = useDispatch();

 
  const id = useSelector((state) => state.user.Authentication.id);

  const loader = useSelector((state) => state.user.Authentication.loader);
  const StartFetch = useSelector((state) => state.user.Authentication.StartFetch);
  
  
    React.useEffect(() => {

    
    
    
    if(id && StartFetch){
      const data = async  () => {

        dispatch(login({loader:true}))


        const response = await fetch(import.meta.env.VITE_GET_POST, {
          method: "GET",
          
          credentials: "include", 
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data from getting post:--" ,data);
          dispatch(UpdateDataOfBlogs(data));
          
          dispatch(login({loader:false,StartFetch:false}))
        }
        else{
          dispatch(login({loader:false,StartFetch:false}))
          console.log("error");
          return false
        };
      }

      
      
     data();
    }
     
      
      
      
    },[id]);
    
    
    
     return(
  <>
 
  {id? 

  (

    <div className="container" >
      <div className="row"  >

      {Posts && Posts.map((post) => {
        if(post.id == id){return(<PostCard  image={`https://blogging-website.site/${post.IMAGE}`} Title={post.TITLE} Summary={post.SUMMARY} button={true} Content={post.CONTENT} date={post.date} id={nanoid()} />)
        }
        else{
          return(<PostCard  image={`https://blogging-website.site/${post.IMAGE}`} Title={post.TITLE} Summary={post.SUMMARY} button={false} Content={post.CONTENT} date={post.date} />)}
        
        } )}
  
      </div>
      {loader && <center><h1>Loading...</h1></center>}
   </div> 
  )


  
    
 
  : 
  (<center><h1 style={{color:"red"}}>You are not logged in</h1></center>)
  }
  
   </>
) 
      
}

