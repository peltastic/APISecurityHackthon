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
    })
      .min(8, "Password too Short - should be min of 8 chars ")
      .refine(
        (value) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            value
          ),
        "Password must contain minimum eight characters, at least one letter, one number and one special character:"
      ),
    note: string().optional(),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }).min(8, "Password is too short - should be min 8 chars"),
    companyAddress: string({
      required_error: "Company's Address is Required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not Match",
    path: ["passwordConfirmation"],
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is Required",
    }).email(),
    password: string({
      required_error: "Password is required",
    }).min(8, "Invalid email or Password"),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"]
