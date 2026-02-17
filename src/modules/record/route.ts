import { Router } from "express"
import { Controller } from "./controller"
import { verifyToken } from "../../middleware/token"

/* record */
const router = Router()

//! POST
router.post("/create", verifyToken, Controller.create)
router.post("/list", verifyToken, Controller.list)

export default router
