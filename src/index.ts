import { Router } from "express"
import msCustomerRouter from "./modules/ms_user/route"

/* index.ts */
const router = Router()

router.use("/ms_user", msCustomerRouter)

export default router
