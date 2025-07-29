import { Router } from "express";
import { AccountController } from "../controllers/account.controller";
import { schemaValidator } from "../middlewares/schemaValidator";
import { AccountSchema } from "../validators/accounts.validators";

const router = Router();

router.get("/", AccountController.getAccounts);
router.post("/", schemaValidator(AccountSchema), AccountController.createAccount);

export default router;
