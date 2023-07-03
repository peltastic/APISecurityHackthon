import express from "express";
import validateSchema from "../middlewares/validateSchema";
import { createClientSchema } from "../schema/clients.schema";
import { createClient, getAllClients, getClient, updateClient } from "../controllers/clients.controller";

const router = express.Router();

router.post("/create-client", validateSchema(createClientSchema), createClient);
router.get("/all", getAllClients)
router.get("/client/:id", getClient)
router.delete("/client/:id", getClient)
router.put("/client/:id", updateClient)

export default router