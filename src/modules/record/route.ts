import { Router } from "express"
import { Controller } from "./controller"
import { verifyToken } from "../../middleware/token"

/* record */
const router = Router()

//! POST
router.post("/create", verifyToken, Controller.create)

export default router
