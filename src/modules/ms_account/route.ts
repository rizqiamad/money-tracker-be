import { Router } from "express"
import { Controller } from "./controller"

/* ms_account */
const router = Router()

//! POST
router.post("/list", Controller.list)

export default router
