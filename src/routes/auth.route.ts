import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { bodyValidator } from "../middlewares/bodyValidator";
import { LoginSchema, RegisterSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", bodyValidator(RegisterSchema), AuthController.register);
router.post("/login", bodyValidator(LoginSchema), AuthController.login);

export default router;
