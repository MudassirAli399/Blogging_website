

import  asynchandler from "../Utils/Asynchandler.js";

import jwt from "jsonwebtoken"
const verifyjwt = asynchandler(async(req,res,next)=>{
    const accesstoken = req.cookies?.accessToken || false
    if(!accesstoken){
        return res.status(401).json({
            status:"error",
            message:"Unauthorized"
        })
    }
    const decodetoken = jwt.verify(accesstoken,process.env.JWT_SECRET)
    console.log("Decoded Token:", decodetoken); // Debugging line to check the decoded token
    req.email = decodetoken.email 
    req.username = decodetoken.username
    req.id = decodetoken.id
    
    next()
})

export default verifyjwt