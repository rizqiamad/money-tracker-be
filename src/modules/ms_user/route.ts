import { Router } from "express"
import { Controller } from "./controller"

/* ms_user */
const router = Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/verify_otp", Controller.verifyOtp)
router.post("/send_otp", Controller.sendOtp)
router.post("/forgot_password", Controller.forgotPassword)

export default router
