import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.get("/profile", UserController.getProfile);
router.get("/:id", UserController.getUserById);

export default router;
