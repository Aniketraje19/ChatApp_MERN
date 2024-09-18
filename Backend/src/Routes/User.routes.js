import { Router } from "express";
import { refreshAccessToken, signin,signup,logout } from "../Controllers/User.controller.js";

const router = Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/logout").post(logout)


export default router