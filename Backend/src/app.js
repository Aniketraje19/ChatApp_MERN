import express from "express"
import { chats } from "./data.js"
import cors from "cors"
const app = express()

app.use(cors({
    origin:"*",
    credentials:true
}))

app.get("/",(req,res)=>{
    res.send("Api Server is Running!")
})

app.get("/api/v1/chat",(req,res)=>{
    res.send(chats)
})

app.get("/api/v1/chat/:id",(req,res)=>{
    const singleChat = chats.find(chat => chat._id === req.params.id) || "No Chats found!"
    res.send(singleChat)
})

export {app}