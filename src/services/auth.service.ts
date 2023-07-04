import { IOtpUrl } from "../interfaces/interfaces";
import UserModel from "../models/users.model";

export const updateUserOtpUrl = async (payload: IOtpUrl) => {
  await UserModel.updateOne(
    { _id: payload.id },
    {
      otp_auth_url: payload.otp_auth_url,
      otp_base32: payload.otp_base32,
    }
  );
};

export const updateOTPEnabled = async (id: string) => {
  await UserModel.updateOne(
    { _id: id },
    { otp_enabled: true, otp_verified: true }
  );
};

export const disableOTP = async (id: string) => {
  await UserModel.updateOne(
    { _id: id },
    { otp_enabled: false, otp_verified: false }
  );
};
