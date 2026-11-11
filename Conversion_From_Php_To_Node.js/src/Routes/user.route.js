import {Router} from "express"
import {CreateUser,LoginUser,LogoutUser } from "../Controllers/user.controller.js"
import verifyjwt from "../Middlewares/verifyjwt.middleware.js"


const UserRouter = new Router()

UserRouter
.post("/create", CreateUser)
.post("/login",LoginUser)
.get("/logout", LogoutUser)
.get("/verifyIdentity",verifyjwt,(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"Identity verified",
        user: {
            id: String(req.id),
            username: req.username,
            email: req.email,
            }
       
    })
})

export default UserRouter