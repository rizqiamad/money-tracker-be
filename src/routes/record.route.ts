import { Router } from "express";
import { RecordController } from "../controllers/record.controller";
import { schemaValidator } from "../middlewares/schemaValidator";
import { RecordSchema } from "../validators/record.validator";

/* /api/records */
const router = Router();

// GET
router.get("/", RecordController.getRecords);

// POST
router.post("/", schemaValidator(RecordSchema), RecordController.addRecord);

export default router;
