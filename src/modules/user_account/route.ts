import { Router } from "express"
import { Controller } from "./controller"

/* user_account */
const router = Router()

//! POST
router.post("/bulk_create", Controller.bulkCreate)
router.post("/list", Controller.list)

export default router
