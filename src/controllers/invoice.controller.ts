import { Request, Response, NextFunction } from "express";
import { CreateInvoiceInput, UpdateInvoiceInput } from "../schema/invoice.schema";
import { createInvoiceService,
  getAllInvoiceService,
  getAnInvoiceService,
  deleteInvoiceService,
  updateInvoiceService } from "../services/invoice.service";
import { IPagination } from "../interfaces/interfaces";

const createInvoice = async (
  req: Request<{}, {}, CreateInvoiceInput>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    await createInvoiceService(body);
    return res.status(201).json({
      success: true,
      message: "Invoice Created Successfully",
    });
  } catch (e) {
    next(e);
  }
};

const getAllInvoice= async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { limit, page } = req.query;
  const queries: IPagination = {
    skip: 0,
    limit: 0,
  };

  const perpage = Number(limit) || 10;
  const offset = Number(page) - 1 || 0;
  const skip = perpage * offset;
  queries.skip = skip;
  queries.limit = perpage;

  try {
    const data: any = await getAllInvoiceService(queries);

    return res.status(200).json({
      success: true,
      message: "Data Retrieved Successfully",
      data,
    });
  } catch (e) {
    next(e);
  }
};

const getAnInvoice= async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  try {
    const data: any = await getAnInvoiceService(id);
    return res.status(200).json({
      success: true,
      message: "Data Retrieved Successfully",
      data,
    });
  } catch (e) {
    next(e);
  }
};

const updateInvoice = async (
  req: Request<UpdateInvoiceInput["params"], {}, UpdateInvoiceInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const {id} = req.params;

  try {
    await updateInvoiceService(body, id);
    return res.status(200).json({
      success: true,
      message: "Invoice Updated Successfully",
    });
  } catch (e) {
    next(e);
  }
};

const deleteInvoice = async (req: Request, res: Response, next: NextFunction) => {
   const {id} = req.params

   try {
     await deleteInvoiceService(id)
     return res.status(200).json({
      success: true,
      message: "Invoice Deleted Successfully",
    });
   } catch (e) {
    next(e)
   }
}

export { createInvoice, getAllInvoice, getAnInvoice, updateInvoice, deleteInvoice};
