import { Request, Response, NextFunction } from "express";
import { CheckEmail, CreateUser, FindEmail } from "../services/users.service";

import {
  CreateUserInput,
  LoginUserInput,
} from "../schema/users.schema";
import bcrypt from "bcrypt";
import { generateJwt } from "../utils/jwt";


const createUser = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  const { email, password, companyAddress, name, phoneNumber, note } = req.body;
  try {
    const emailExists = await CheckEmail(email);
    if (emailExists) {
      return res.status(400).send({
        message: "Email Already Exists!",
        success: false,
      });
    }
    await CreateUser({
      email,
      password,
      companyAddress,
      name,
      phoneNumber,
      note,
    });
    return res.status(201).json({
      success: true,
      message: "User Signed Up Successfully",
    });
  } catch (e) {
    next(e);
  }
};

const loginUser = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const emailExists = await CheckEmail(email);
    if (!emailExists) {
      return res.status(401).send({
        message: "Invalid Email or Password",
        success: false,
      });
    }
    const user: any = await FindEmail(email);
    console.log(user);
    const isValidPassword = await bcrypt.compare(password, user?.password);
    if (!isValidPassword) {
      return res.status(401).send({
        message: "Invalid Email or Password",
        success: false,
      });
    }

    const payload = {
      user_id: user?._id,
      email: user?.email,
    };
 
    const token = generateJwt(payload)
    
    if (user?.otp_enabled) {
      res.status(200).json({
        success: true,
        message: "User Logged In Successfully",
        otp_enabled: true,
        email: user?.email,
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      otp_enabled: false,
      email: user?.email,
      token,
    });
  } catch (e) {
    next(e);
  }
};



export { createUser, loginUser };
