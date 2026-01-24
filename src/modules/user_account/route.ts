import { Router } from "express"
import { Controller } from "./controller"
import { verifyToken } from "../../middleware/token"

/* user_account */
const router = Router()

//! POST
router.post("/bulk_create", verifyToken, Controller.bulkCreate)
router.post("/list", verifyToken, Controller.list)

//! PATCH
router.patch("/update", verifyToken, Controller.update)

export default router
