import { Schema, model } from "mongoose";
import {randomUUID} from "crypto"

interface IClient {
    name: string,
    phoneNumber: string,
    email: string
    note: string
    companyAddress: string
    _id: any
}

const clientsSchema = new Schema<IClient>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  note: { type: String },
  companyAddress: { type: String, required: true },
  _id: {type: 'UUID', default: () => randomUUID()}
});

const ClientsModel = model<IClient>("Client", clientsSchema)

export default ClientsModel