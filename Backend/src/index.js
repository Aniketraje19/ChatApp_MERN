
import connectDB from "./DB/index.js"
import dotenv from "dotenv"
import {app} from "./app.js"

dotenv.config({
    path:"./.env"
})

const port = process.env.PORT || 5000


connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server Started on Port ${port}`)
    })
})
.catch(error=>console.log(`MongoDB Connection Failed! : ${error}`))
