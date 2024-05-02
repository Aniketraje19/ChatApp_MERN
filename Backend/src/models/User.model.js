import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        required:true,
        default:"https://www.shareicon.net/data/512x512/2016/11/14/852267_user_512x512.png"
    },
},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User