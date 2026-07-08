import React from "react";
import AddPostForm from "../components/Elements/AddPostForm";
import { useSelector } from "react-redux";
export default function AddPost(){
    const state = useSelector((state) => state.user);
    console.log(state)
    const title = useSelector((state)=>state.user.BlogPost.title);
    if(title){
        return(
            <AddPostForm
            URL={import.meta.env.VITE_UPDATE_POST}
            />
        )
    }
    else{
        return(
        <AddPostForm
        URL={import.meta.env.VITE_ADD_POST}
        />
    )
    }
    
}