import { Router } from "express";
import { schemaValidator } from "../middlewares/schemaValidator";
import { TransferLogSchema } from "../validators/transfer.validator ";
import { TransferController } from "../controllers/transfer.controller";

/* /api/transfer-logs */
const router = Router();

// POST
router.post("/", schemaValidator(TransferLogSchema), TransferController.addLog);

export default router;
