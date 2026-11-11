import React from "react"
import Header from "./Header"
import {Outlet} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { login } from "../store/Slice.js";
import { useNavigate } from "react-router-dom";
export default function Layout(){
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(()=>{
        const verifyIdentity = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_VERIFY_ACCOUNT, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  const data = await response.json();
                  if(data.status=="success"){
                    console.log(data)
                    dispatch(login({loader:false,id:data.user.id, status:true,email:data.user.email,username:data.user.username}));
                    return data
                  }
                  else{
                    navigate("/Signin")
                    return false
                  }
            } catch (error) {
                console.log(error);
            }
          };
          verifyIdentity();
    },[])
    
    return(
        <>
        
        <Header />
        <Outlet />

        </>
    )
}