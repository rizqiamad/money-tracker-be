import { Router } from "express"
import { Controller } from "./controller"
import { verifyToken } from "../../middleware/token"

/* ms_category */
const router = Router()

//! POST
router.post("/list", verifyToken, Controller.list)

export default router
