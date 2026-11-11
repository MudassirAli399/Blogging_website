import express from "express"
import UserRouter from "./Routes/user.route.js"
import PostRouter from "./Routes/post.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"


export const app = express()

app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials:true
  }
))
app.use(cookieParser())
app.use(express.json({limit : "30kb"}))
app.use(express.urlencoded({limit : "30kb",extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.send("Hello MudassirAli")
})

app.use("/api/user",UserRouter)
app.use("/api/post",PostRouter)

app.use((err, req, res, next) => {
  console.error("❌ Error caught:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

