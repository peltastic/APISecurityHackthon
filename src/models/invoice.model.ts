import { Schema, model } from "mongoose"
import {randomUUID} from "crypto"
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
    _id: any
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
    _id: {type: 'UUID', default: () => randomUUID()},
 }
 )


 const invoiceModel = model<INvoice>('Invoice', invoiceSchema)


 export default invoiceModel