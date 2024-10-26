import { Router } from "express";
import { refreshAccessToken, signin,signup,logout,Users } from "../Controllers/User.controller.js";
import { auth } from "../Middlewares/auth.middleware.js";
const router = Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/logout").post(logout)

router.route("/").get(auth,Users)


export default router