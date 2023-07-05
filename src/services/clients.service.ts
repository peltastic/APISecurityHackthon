import { IPagination } from "../interfaces/interfaces";
import ClientsModel from "../models/clients.model";

interface ICreateClient {
  name: string;
  phoneNumber: string;
  email: string;
  note?: string;
  companyAddress: string;
}
interface IUpdateClient {
  name?: string;
  phoneNumber?: string;
  email?: string;
  note?: string;
  companyAddress?: string;
}

export const createClientService = async (body: ICreateClient) => {
  return await ClientsModel.create(body);
};

export const getAllClientsService = async (body: IPagination) => {
  const data = await ClientsModel.find({}).limit(body.limit).skip(body.skip);
  return data;
};

export const getClientService = async (id: string) => {
    const data = await ClientsModel.findOne({
        _id: id
    })

    return data
}

export const updateClientService = async (body: IUpdateClient, id: any) => {
    await ClientsModel.updateOne({_id: id}, body)
}

export const deleteClientService = async (id: any) => {
    await ClientsModel.deleteOne({_id: id})
}