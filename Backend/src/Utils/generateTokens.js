import User from "../models/User.model.js"

import jwt from "jsonwebtoken"

const generateTokens = async (userId) => {
    const user = await User.findById(userId).select("-password -refreshToken")
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save()
    console.log(refreshToken)
    return {accessToken,refreshToken}
}

export default generateTokens