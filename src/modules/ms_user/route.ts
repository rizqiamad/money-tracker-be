import { Router } from "express"
import { Controller } from "./controller"

/* ms_user */
const router = Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/veriy-otp", Controller.verifyOtp)
router.post("/new-otp", Controller.verifyOtp)

export default router
