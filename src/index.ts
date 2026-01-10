import { Router } from "express"
import msCustomerRouter from "./modules/ms_user/route"
import userAccountRouter from "./modules/user_account/route"
import msAccountRouter from "./modules/ms_account/route"

/* index.ts */
const router = Router()

router.use("/ms_account", msAccountRouter)
router.use("/ms_user", msCustomerRouter)
router.use("/user_account", userAccountRouter)

export default router
