import invoiceModel from "../models/invoice.model";
import { IPagination } from "../interfaces/interfaces";


interface ICreateInvoice {
    invoiceName: string,
    issueDate: Date,
    invoiceDesc?: string,
    dueDate: Date,
    amount: number,
    draft: boolean,
    hasClientPaid: boolean,
    paymentReference?: string,
  }


interface IUpdateInvoice {
    invoiceName?: string,
    issueDate?: Date,
    invoiceDesc?: string,
    dueDate?: Date,
    amount?: number,
    draft?: boolean,
    hasClientPaid?: boolean,
    paymentReference?: string,
}
  
export const createInvoiceService = async (body: ICreateInvoice) => {
    await invoiceModel.create(body);
  };
  
  export const getAllInvoiceService = async (body: IPagination) => {
    const data = await invoiceModel.find({}).limit(body.limit).skip(body.skip);
    return data;
  };
  
  export const getAnInvoiceService = async (id: any) => {
      const data = await invoiceModel.findOne({
          _id: id
      })
  
      return data
  }
  
  export const updateInvoiceService = async (body: IUpdateInvoice, id: any) => {
      await invoiceModel.updateOne({_id: id}, body)
  }

  export const deleteInvoiceService = async (id: any) => {
      await invoiceModel.deleteOne({_id: id})
  }