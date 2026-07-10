import React from "react"
import Header from "./Header"
import {Outlet} from "react-router-dom"
import { useSelector } from "react-redux";
export default function Layout(){
    
    return(
        <>
        
        <Header />
        <Outlet />

        </>
    )
}