import { ApiError, ApiResponse, asyncHandler, generateTokens } from "../Utils/index.js"
import User from "../models/User.model.js"
import jwt from "jsonwebtoken"

const signup = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required!")
    }

    const existingEmail = await User.findOne({ email })

    if (existingEmail) {
        throw new ApiError(400, "User with same email already exists!")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (!user) {
        throw new ApiError(500, "Something went wrong while creating User Account!")
    }
    return res.status(200).json(
        new ApiResponse(200, { id: user._id, name: user.name, email: user.email }, "User created Successfully!")
    )
})

const signin = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "All fields are required!")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "Invalid email!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid Password!")
    }

    const { accessToken, refreshToken } = await generateTokens(user._id)

    const cookieOptions = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(200,
                { accessToken, user: { id: user._id, name: user.name, email: user.email, profile: user.profilePic } },
                "User Logged in Successfully!"
            )
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const userRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!userRefreshToken) {
        throw new ApiError(400, "Unauthorized request!")
    }

    let decodedToken = ""

    try {
        decodedToken = jwt.verify(userRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    }
    catch (error) {
        throw new ApiError(400, "Invalid refresh token!")
    }

    const user = await User.findById(decodedToken._id)

    if (!user) {
        throw new ApiError(400, "Invalid refresh Token!")
    }
    if (userRefreshToken !== user?.refreshToken) {
        throw new ApiError(400, "Invalid refresh Token")
    }

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    const { accessToken, refreshToken } = await generateTokens(user._id)


    return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(200,
                { accessToken },
                "Access token refreshed!"
            )
        )
})

const logout = asyncHandler(async (req, res) => {
    console.log("logout hit")
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        path: '/'
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.status(200)
        .json(
            new ApiResponse(200,
                "User logged out Successully!"
            )
        )
})

const Users = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]
    } : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    return res.status(200).json({ message: "All Users fetched!", users })
})

export { signin, signup, refreshAccessToken, logout, Users }