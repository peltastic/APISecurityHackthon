import { object, string, TypeOf } from "zod";

export const createClientSchema = object({
  body: object({
    name: string({
      required_error: "User's Name is Required",
    }),
    phoneNumber: string({
      required_error: "User's Phone Number is Required",
    }).min(11, "Phone number must not be less than 11 characters"),
    email: string({
      required_error: "Email is Required",
    }).email(),
    note: string().optional(),
    companyAddress: string({
      required_error: "Company's Address is Required",
    }),
  }),
});

export const updateClientSchema = object({
  body: object({
    name: string().optional(),
    phoneNumber: string().min(11, "Phone number must not be less than 11 characters").optional(),
    email: string().email().optional(),
    companyAddress: string().optional(),
    note: string().optional()

  })
})


export type CreateClientInput = TypeOf<typeof createClientSchema>["body"]

export type UpdateClientInput = TypeOf<typeof updateClientSchema>["body"]