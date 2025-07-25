import { Router } from "express";
import { AccountController } from "../controllers/account.controller";

const router = Router();

router.get("/", AccountController.getAccounts);

export default router;
