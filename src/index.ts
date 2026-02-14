import { Router } from "express"
import msAccountRouter from "./modules/ms_account/route"
import msCategoryRouter from "./modules/ms_category/route"
import msCustomerRouter from "./modules/ms_user/route"
import recordRouter from "./modules/record/route"
import subCategoryRouter from "./modules/sub_category/route"
import userAccountRouter from "./modules/user_account/route"

/* index.ts */
const router = Router()

router.use("/ms_account", msAccountRouter)
router.use("/ms_category", msCategoryRouter)
router.use("/ms_user", msCustomerRouter)
router.use("/record", recordRouter)
router.use("/sub_category", subCategoryRouter)
router.use("/user_account", userAccountRouter)

export default router
