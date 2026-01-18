import { Router } from "express"
import { Controller } from "./controller"

/* ms_user */
const router = Router()

//! POST
router.post("/change_password", Controller.changePassword)
router.post("/forgot_password", Controller.forgotPassword)
router.post("/login", Controller.login)
router.post("/reset_password", Controller.resetPassword)
router.post("/register", Controller.register)
router.post("/resend_otp", Controller.resendOtp)
router.post("/verify_otp", Controller.verifyOtp)
router.post("/verify_token", Controller.verifyToken)

export default router
