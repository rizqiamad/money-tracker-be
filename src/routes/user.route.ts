import { Router } from "express";
import { UserController } from "../controllers/user.controller";

/* /api/users */
const router = Router();

// GET
router.get("/profile", UserController.getProfile);

export default router;
