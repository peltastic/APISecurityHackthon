import express from "express";
import validateSchema from "../middlewares/validateSchema";
import { createClientSchema } from "../schema/clients.schema";
import {
  createClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller";
import { createLimiter } from "../middlewares/rateLimiter.middleware";

const router = express.Router();

router.post(
  "/create-client",
  createLimiter("You have exceeded the 5 requests in 1 minute limit!", 1, 5),
  validateSchema(createClientSchema),
  createClient
);
router.get(
  "/all",
  createLimiter("You have exceeded the 5 requests in 1 minute limit!", 1, 5),
  getAllClients
);
router.get(
  "/client/:id",
  createLimiter("You have exceeded the 5 requests in 1 minute limit!", 1, 5),
  getClient
);
router.delete("/client/:id", deleteClient);
router.put(
  "/client/:id",
  createLimiter("You have exceeded the 4 requests in 1 minute limit!", 1, 4),
  updateClient
);

export default router;
