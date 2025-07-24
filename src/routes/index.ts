import { Router } from "express";
import accountRouter from "./account.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import { verifyCookies } from "../middlewares/verifyCookies";

const router = Router();

router.use("/accounts", verifyCookies, accountRouter);
router.use("/auth", authRouter);
router.use("/users", verifyCookies, userRouter);

export default router;
