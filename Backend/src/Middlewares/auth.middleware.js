import jwt from "jsonwebtoken"
import User from "../models/User.model.js"
import { asyncHandler } from "../Utils/index.js"

export const auth = asyncHandler(async (req, res, next) => {
    let token;
   
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            console.log("Bye")
            token = req.headers.authorization.split(" ")[1]

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            req.user = await User.findById(decodedToken._id).select("-password")
            next()

        } catch (error) {
            res.status(401)
            throw new Error("Not Authorized User!")
        }

    }
    if (!token) {
        res.status(401)
        throw new Error("Not Authroized User!")
    }

})
