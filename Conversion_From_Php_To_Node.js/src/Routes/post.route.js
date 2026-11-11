import {Router} from "express"
import {AddPost,Updatepost,Getpost} from "../Controllers/post.controller.js"
import UploadMiddleware from "../Middlewares/multer.middlware.js"

const PostRouter = new Router()
// Donot forget to write / before add
PostRouter
.post("/add", UploadMiddleware, AddPost)
.post("/update",UploadMiddleware, Updatepost)
.post("/delete",()=>console.log("delete"))
.get("/get",Getpost)
.post("/search",()=>console.log("search"))

export default PostRouter