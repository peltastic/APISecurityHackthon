import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IClient {
  name: string;
  phoneNumber: string;
  email: string;
  note: string;
  companyAddress: string;
  _id: string;
}

const clientsSchema = new Schema<IClient>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  note: { type: String },
  companyAddress: { type: String, required: true },
  _id: { type: String, default: () => uuidv4() },
});

const ClientsModel = model<IClient>("Client", clientsSchema);

export default ClientsModel;