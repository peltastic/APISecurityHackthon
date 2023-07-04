import { Schema, model } from "mongoose"
import { v4 as uuidv4 } from "uuid";
import { boolean, string } from "zod"

interface INvoice{
    issueDate: Date,
    invoiceName: string,
    invoiceDesc : string,
    dueDate : Date,
    amount: Number,
    draft: boolean,
    userId : string,
    clientId: {type:String},
    hasClientPaid : boolean,
    paymentReference: string,
    _id: string
 }

 const invoiceSchema = new Schema<INvoice>(
    {
    issueDate: {type :Date, required: true},
    invoiceName: {type:String, required: true},
    invoiceDesc : {type: String},
    dueDate : {type: Date, required: true},
    amount: {type: Number, required: true},
    draft: {type: Boolean, default: false},
    userId : {type: String, required: true},
    clientId:  {type: String, required: true},
    hasClientPaid : {type: Boolean, defauly:false},
    paymentReference: {type:String},
    _id: {type: String, default: () => uuidv4()},
 }
 )


 const invoiceModel = model<INvoice>('Invoice', invoiceSchema)


 export default invoiceModel