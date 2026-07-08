import React from "react"

import { useSelector,useDispatch } from "react-redux"

import { logout } from "../store/Slice"
export default function Logout ({email}){


                disptach = useDispatch()

                React.useEffect(()=>{
                    
                        disptach(logout())
                    
                },[email])


                const response = async ()=>{
                    const response = await fetch(import.meta.env.VITE_DELETE_SESSION, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          useremail: email,
                        }),
                      });

                      const data = await response.json();
                      return (data || false)
                    }
                    if(response){
                        return true
                    }
                }