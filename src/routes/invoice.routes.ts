import express from "express";
import validateSchema from "../middlewares/validateSchema";
import { createInvoiceSchema } from "../schema/invoice.schema";
import {createInvoice, getAllInvoice, getAnInvoice, updateInvoice, deleteInvoice} from "../controllers/invoice.controller"


const router = express.Router();

router.post("/create-invoice", validateSchema(createInvoiceSchema),createInvoice);
router.get("/all", getAllInvoice )
router.get("/client/:id", getAnInvoice)
router.delete("/client/:id", deleteInvoice)
router.put("/client/:id", updateInvoice)

export default router