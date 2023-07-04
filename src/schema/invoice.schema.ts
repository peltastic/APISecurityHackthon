import {object, string, TypeOf, date, number, boolean} from 'zod'

export const createInvoiceSchema = object({
    body : object({
        invoiceName: string({
            required_error: "Invoice requires a name"
        }),
        issueDate: date({
            required_error: "Invoice issuedate is required",
          }),
        invoiceDesc :string().optional(),
        dueDate: date({
            required_error: "Invoice requires a due date",
          }),
        amount: number({
            required_error:"Invoice requires an amount"
        }),
        draft: boolean().default(false),
        hasClientPaid: boolean().default(false),
        paymentReference: string().optional(),
    })
})


export const updateInvoiceSchema =object({
    body : object({
        invoiceName: string().optional(),
        issueDate: date().optional(),
        invoiceDesc :string().optional(),
        dueDate: date().optional(),
        amount: number().optional(),
        draft: boolean().optional(),
        hasClientPaid: boolean().optional(),
        paymentReference: string().optional(),
    })
})

export type CreateInvoiceInput = TypeOf<typeof createInvoiceSchema>["body"]
export type UpdateInvoiceInput = TypeOf<typeof updateInvoiceSchema>["body"]