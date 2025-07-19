import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { schemaValidator } from "../middlewares/schemaValidator";
import { LoginSchema, RegisterSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", schemaValidator(RegisterSchema), AuthController.register);
router.post("/login", schemaValidator(LoginSchema), AuthController.login);

export default router;
