import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./Routes/User.routes.js"

const app = express()

app.use(cors({
    origin:"*",
    credentials:true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(cookieParser())

app.use("/api/v1/user",userRouter)



export {app}