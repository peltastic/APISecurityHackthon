import { Request, Response, NextFunction } from "express";
import { FindUserById } from "../services/users.service";
import { generateRandomBase32 } from "../utils/helpers";
import { TOTP } from "otpauth";
import { IOtpUrl } from "../interfaces/interfaces";
import {
  disableOTP,
  updateOTPEnabled,
  updateUserOtpUrl,
} from "../services/auth.service";
import { generateJwt } from "../utils/jwt";
import config from "config"
import { GenerateOtpUrlInput, UpdateOtpEnabledInput } from "../schema/auth.schema";

const generateOTP = async (req: Request<{},{}, GenerateOtpUrlInput>, res: Response, next: NextFunction) => {
  const { user_id } = req.body;

  try {
    const user = await FindUserById(user_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exists",
      });
    }

    const base32_secret = generateRandomBase32();

    let totp = new TOTP({
      issuer: config.get("TOTP_ISSUER"),
      label: config.get("TOTP_LABEL"),
      algorithm: "SHA1",
      digits: 6,
      period: 15,
      secret: base32_secret,
    });
    let otpauth_url = totp.toString();

    const payload: IOtpUrl = {
      id: user_id,
      otp_auth_url: otpauth_url,
      otp_base32: base32_secret,
    };
    await updateUserOtpUrl(payload);

    return res.status(200).json({
      otpauth_url,
      base32: base32_secret,
    });
  } catch (e) {
    next(e);
  }
};

const verifyOTp = async (req: Request<{},{}, UpdateOtpEnabledInput>, res: Response, next: NextFunction) => {
  const { user_id, token } = req.body;
  try {
    const user = await FindUserById(user_id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    let totp = new TOTP({
      issuer: config.get("TOTP_ISSUER"),
      label: config.get("TOTP_LABEL"),
      algorithm: "SHA1",
      digits: 6,
      period: 15,
      secret: user.otp_base32,
    });
    let delta = totp.validate({ token, window: 1 });

    if (delta === null) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    await updateOTPEnabled(user_id);

    const payload = {
      user_id: user?._id,
      email: user?.email,
    };

    const jwt_token = generateJwt(payload);

    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      otp_enabled: true,
      email: user?.email,
      token: jwt_token,
    });
  } catch (e) {
    next(e);
  }
};

const validateOTP = async (req: Request<{},{},UpdateOtpEnabledInput>, res: Response, next: NextFunction) => {
  const { user_id, token } = req.body;
  try {
    const user = await FindUserById(user_id);
    const message = "Invalid Token";

    if (!user) {
      return res.status(401).json({
        success: false,
        message,
      });
    }

    let totp = new TOTP({
      issuer: config.get("TOTP_ISSUER"),
      label: config.get("TOTP_LABEL"),
      algorithm: "SHA1",
      digits: 6,
      period: 15,
      secret: user.otp_base32!,
    });

    let delta = totp.validate({ token, window: 1 });

    if (delta === null) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    await updateOTPEnabled(user_id);

    const payload = {
      user_id: user?._id,
      email: user?.email,
    };

    const jwt_token = generateJwt(payload);

    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      otp_enabled: true,
      email: user?.email,
      token: jwt_token,
    });
  } catch (e) {
    next(e);
  }
};

const disableOtp = async (req: Request<{},{},UpdateOtpEnabledInput>, res: Response, next: NextFunction) => {
  const { user_id } = req.body;
  try {
    const user = await FindUserById(user_id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    await disableOTP(user_id);

    res.status(200).json({
      otp_disabled: true,
      user: {
        email: user.email,
        otp_enabled: false,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { generateOTP, verifyOTp, validateOTP, disableOtp };
