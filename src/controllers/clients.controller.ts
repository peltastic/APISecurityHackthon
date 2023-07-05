import { Request, Response, NextFunction } from "express";
import { CreateClientInput, UpdateClientInput } from "../schema/clients.schema";
import {
  createClientService,
  deleteClientService,
  getAllClientsService,
  getClientService,
  updateClientService,
} from "../services/clients.service";
import { IPagination } from "../interfaces/interfaces";

const createClient = async (
  req: Request<{}, {}, CreateClientInput>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    const user = await createClientService(body);
    return res.status(201).json({
      success: true,
      message: "Client Created Successfully",
      user,
    });
  } catch (e) {
    next(e);
  }
};

const getAllClients = async (
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
    const data: any = await getAllClientsService(queries);

    return res.status(200).json({
      success: true,
      message: "Data Retrieved Successfully",
      data,
    });
  } catch (e) {
    next(e);
  }
};

const getClient = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const data = await getClientService(id);
    return res.status(200).json({
      success: true,
      message: "Data Retrieved Successfully",
      data,
    });
  } catch (e) {
    next(e);
  }
};

const updateClient = async (
  req: Request<UpdateClientInput["params"], {}, UpdateClientInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const { id } = req.params;

  try {
    await updateClientService(body, id);
    return res.status(200).json({
      success: true,
      message: "Client Updated Successfully",
    });
  } catch (e) {
    next(e);
  }
};

const deleteClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params;

  try {
    await deleteClientService(id);
    return res.status(200).json({
      success: true,
      message: "Client Deleted Successfully",
    });
  } catch (e) {
    next(e);
  }
};

export { createClient, getAllClients, getClient, updateClient, deleteClient };
