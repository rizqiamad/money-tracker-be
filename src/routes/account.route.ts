import { Router } from "express";
import { AccountController } from "../controllers/account.controller";
import { schemaValidator } from "../middlewares/schemaValidator";
import { AccountSchema } from "../validators/account.validator";

const router = Router();

// GET
router.get("/", AccountController.getAccounts);

// POST
router.post("/", schemaValidator(AccountSchema), AccountController.createAccount);

export default router;
