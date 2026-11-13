import {Router} from "express"
import {AddPost,Updatepost,Getpost,Deletepost,Searchpost} from "../Controllers/post.controller.js"
import UploadMiddleware from "../Middlewares/multer.middlware.js"

const PostRouter = new Router()
// Donot forget to write / before add
PostRouter
.post("/add", UploadMiddleware, AddPost)
.post("/update",UploadMiddleware, Updatepost)
.post("/delete",Deletepost)
.get("/get",Getpost)
.post("/search",Searchpost)


export default PostRouter