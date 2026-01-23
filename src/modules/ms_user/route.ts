import { Router } from "express"
import { Controller } from "./controller"
import { verifyToken } from "../../middleware/token"

/* ms_user */
const router = Router()

//! GET
router.get("/profile", verifyToken, Controller.profile)

//! PATCH
router.patch("/change_password", Controller.changePassword)
router.patch("/reset_password", Controller.resetPassword)
router.patch("/update", verifyToken, Controller.update)

//! POST
router.post("/forgot_password", Controller.forgotPassword)
router.post("/login", Controller.login)
router.post("/logout", Controller.logout)
router.post("/register", Controller.register)
router.post("/resend_otp", Controller.resendOtp)
router.post("/verify_otp", Controller.verifyOtp)
router.post("/verify_token", Controller.verifyToken)

export default router
