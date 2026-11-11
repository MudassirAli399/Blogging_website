import dotenv from "dotenv"
import {app} from "./app.js"
import {testConnection} from "./Database/db.js"
import { testCloudinary } from "./Utils/Cloudinary.js"

dotenv.config();



testCloudinary()
testConnection()
.then(
    app.listen(process.env["PORT"],()=>{
    console.log("MudassirAli")
    })

).catch(console.error)



