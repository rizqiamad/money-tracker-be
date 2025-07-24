import { Router } from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import { verifyCookies } from "../middlewares/verifyCookies";

const router = Router();

router.use("/users", verifyCookies, userRouter);
router.use("/auth", authRouter);

export default router;
