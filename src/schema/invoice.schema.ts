import {object, string, TypeOf, date, number, boolean} from 'zod'

export const createInvoiceSchema = object({
    body : object({
        invoiceName: string({
            required_error: "Invoice requires a name"
        }),
        issueDate: string({
            required_error: "Invoice issuedate is required",
          }),
        invoiceDesc :string().optional(),
        dueDate: string({
            required_error: "Invoice requires a due date",
          }),
        amount: number({
            required_error:"Invoice requires an amount"
        }),
        draft: boolean().default(false).optional(),
        hasClientPaid: boolean().default(false).optional(),
        paymentReference: string().optional(),
    })
})


export const updateInvoiceSchema =object({
    body : object({
        invoiceName: string().optional(),
        issueDate: string().optional(),
        invoiceDesc :string().optional(),
        dueDate: string().optional(),
        amount: number().optional(),
        draft: boolean().optional(),
        hasClientPaid: boolean().optional(),
        paymentReference: string().optional(),
    }),
    params: object({
        id: string()
    })
})

export type CreateInvoiceInput = TypeOf<typeof createInvoiceSchema>["body"]
export type UpdateInvoiceInput = TypeOf<typeof updateInvoiceSchema>