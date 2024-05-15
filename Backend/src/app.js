import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./Routes/User.routes.js"
import { notFound } from "./Middlewares/errors.middleware.js"

const app = express()

app.use(cors({
    origin:"*",
    credentials:true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(cookieParser())

app.all("/",(req,res)=>{
    return res.send("Chat App Api Server Running!")
})

app.use("/api/v1/user",userRouter)

app.use(notFound)


export {app}