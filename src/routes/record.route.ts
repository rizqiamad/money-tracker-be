import { Router } from "express";
import { RecordController } from "../controllers/record.controller";
import { schemaValidator } from "../middlewares/schemaValidator";
import { RecordSchema } from "../validators/record.validator";

const router = Router();

// POST
router.post("/", schemaValidator(RecordSchema), RecordController.addRecord);

export default router;
