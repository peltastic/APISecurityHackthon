import express from "express";
import validateSchema from "../middlewares/validateSchema";
import { createInvoiceSchema } from "../schema/invoice.schema";
import {
  createInvoice,
  getAllInvoice,
  getAnInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoice.controller";
import { createLimiter } from "../middlewares/rateLimiter.middleware";

const router = express.Router();

router.post(
  "/create-invoice",
  createLimiter("You have exceeded the 5 requests in 1 minute limit!", 1, 5),
  validateSchema(createInvoiceSchema),
  createInvoice
);
router.get(
  "/all",
  createLimiter("You have exceeded the 5 requests in 1 minute limit!", 1, 5),
  getAllInvoice
);
router.get(
  "/client/:id",
  createLimiter("You have exceeded the 5 requests in 1 minute limit!", 1, 5),
  getAnInvoice
);
router.delete("/client/:id", deleteInvoice);
router.put(
  "/client/:id",
  createLimiter("You have exceeded the 4 requests in 1 minute limit!", 1, 4),
  updateInvoice
);

export default router;
