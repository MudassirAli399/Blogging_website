import React from "react";
import {useSelector,useDispatch} from "react-redux"
import { login } from "../store/Slice.js";
import PostCard from "../components/Elements/PostCard";
import { nanoid } from "@reduxjs/toolkit";

export default function Postdetails(){

  

  const [Posts,Setposts] = React.useState()

  const dispatch = useDispatch();

 
  const id = useSelector((state) => state.user.Authentication.id);

  const loader = useSelector((state) => state.user.Authentication.loader);
  
  
    React.useEffect(() => {

    
    
    
    if(id){
      const data = async  () => {

        dispatch(login({loader:true}))


        const response = await fetch(import.meta.env.VITE_GET_POST, {
          method: "GET",
          
          credentials: "include", 
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data from getting post:--" ,data);
          Setposts(data);
          dispatch(login({loader:false}))
        }
        else{
          console.log("error");
          return false
        };
      }

      
      
     data();
    }
     
      
      
      
    },[id])
    
    
    
     return(
  <>
 
  {id? 

  loader ? (<center><h1>Loading...</h1></center>) : (<div className="container" >
      <div className="row" >

      {Posts && Posts.map((post) => {
        if(post.id == id){return(<PostCard  image={`http://localhost/apicall/Project-Blog-Backend/${post.IMAGE}`} Title={post.TITLE} Summary={post.SUMMARY} button={true} Content={post.CONTENT} date={post.date} id={nanoid()} />)
        }
        else{
          return(<PostCard  image={`http://localhost/apicall/Project-Blog-Backend/${post.IMAGE}`} Title={post.TITLE} Summary={post.SUMMARY} button={false} Content={post.CONTENT} date={post.date} />)}
        
        } )}
  
      </div>
   </div> )
  
    
 
  : 
  <center><h1 style={{color:"red"}}>You are not logged in</h1></center>
  }
  
   </>
) 
      
}

