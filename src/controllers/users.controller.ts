import { Request, Response } from "express";
import { CheckEmail, CreateUser, FindEmail } from "../services/users.service";
import { CreateUserInput, LoginUserInput } from "../middlewares/schema/users.schema";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from 'config'

const createUser = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const { email, password, companyAddress, name, phoneNumber, note } = req.body;
  const emailExists = await CheckEmail(email);
  if (emailExists) {
    return res.status(400).send({
      message: "Email Already Exists!",
      success: false,
    });
  }
  await CreateUser({ email, password, companyAddress, name, phoneNumber, note});
  return res.status(201).json({
    success: true,
    message: "User Signed Up Successfully",
  });
};

const loginUser = async (req: Request<{}, {}, LoginUserInput>, res: Response) => {
    const {email, password} = req.body;
    const emailExists = await CheckEmail(email);
    if (!emailExists) {
      return res.status(401).send({
        message: "Invalid Email or Password",
        success: false
      });
    }
    const user: any = await FindEmail(email);
    console.log(user)
    const isValidPassword = await bcrypt.compare(password, user?.password);
    if (!isValidPassword) {
      return res.status(401).send({
        message: "Invalid Email or Password",
        success: false
      });
    }
    const payload = {
      user_id: user?._id,
      email: user?.email,
    };
  
    const token = jwt.sign(payload, config.get<string>("JWT_SECRET_KEY"), {
      expiresIn: config.get("JWT_EXPIRY_TIME") 
    });
    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      token,
    });
}

export { createUser, loginUser };
