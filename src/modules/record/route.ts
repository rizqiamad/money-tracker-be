import { Router } from "express"
import { Controller } from "./controller"
import { verifyToken } from "../../middleware/token"

/* record */
const router = Router()

//! POST
router.post("/create", verifyToken, Controller.create)
router.post("/list", verifyToken, Controller.list)

//! GET
router.get("/summary", verifyToken, Controller.summary)

export default router
