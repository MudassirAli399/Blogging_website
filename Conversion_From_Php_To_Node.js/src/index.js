import dotenv from "dotenv"
import express from "express"
import {testConnection} from "./Database/db.js"
import { testCloudinary } from "./Utils/Cloudinary.js"

dotenv.config();
const app = express()
testConnection()
testCloudinary()
app.get("/",(req,res)=>{
    res.send("Hello MudassirAli")
})

app.listen(process.env["PORT"],()=>{
    console.log("MudassirAli")
})


