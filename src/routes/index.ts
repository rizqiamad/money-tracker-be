import { Router } from "express";
import accountRouter from "./account.route";
import authRouter from "./auth.route";
import balanceRouter from "./balance.route";
import recordRouter from "./record.route";
import userRouter from "./user.route";
import { verifyCookies } from "../middlewares/verifyCookies";

/* /api */
const router = Router();

router.use("/accounts", verifyCookies, accountRouter);
router.use("/auth", authRouter);
router.use("/balances", verifyCookies, balanceRouter);
router.use("/records", verifyCookies, recordRouter);
router.use("/users", verifyCookies, userRouter);

export default router;
