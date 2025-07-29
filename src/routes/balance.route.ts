import { Router } from "express";
import { schemaValidator } from "../middlewares/schemaValidator";
import { BalanceSchema } from "../validators/balance.validator";
import { BalanceController } from "../controllers/balance.controller";

const router = Router();

// GET
router.get("/", BalanceController.getBalances);

// POST
router.post("/", schemaValidator(BalanceSchema), BalanceController.addBalance);

export default router;
