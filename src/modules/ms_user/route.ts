import { Router } from "express"
import { Controller } from "./controller"

/* ms_user */
export const router = Router()

router.post("/register", Controller.register)
