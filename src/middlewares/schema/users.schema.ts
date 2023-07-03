import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "User's Name is Required",
    }),
    phoneNumber: string({
      required_error: "User's Phone Number is Required",
    }),
    email: string({
      required_error: "Email is Required",
    }).email(),
    password: string({
      required_error: "Password is Required",
    }).min(6, "Password too Short - should be min of 6 chars "),
    note: string().optional(),
    companyAddress: string({
      required_error: "Company's Address is Required",
    }),
  }),
});



export type CreateUserInput = TypeOf<typeof createUserSchema>["body"]