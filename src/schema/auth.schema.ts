import { object, string, TypeOf } from "zod";

export const generateOtpUrlSchema = object({
  body: object({
    user_id: string().nonempty(),
    otp_auth_url: string(),
    otp_base32: string()
  })
})

export const updateOtpEnabledSchema = object({
    body: object({
    user_id: string().nonempty(),
    _id: string(),
    token: string()
    })
  })
  

export type GenerateOtpUrlInput = TypeOf<typeof generateOtpUrlSchema>["body"];

export type UpdateOtpEnabledInput = TypeOf<typeof updateOtpEnabledSchema>["body"]
