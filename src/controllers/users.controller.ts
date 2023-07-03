import { Request, Response } from "express";
import { CheckEmail, CreateUser } from "../services/users.service";
import { CreateUserInput } from "../middlewares/schema/users.schema";

const createUser = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const { email, password, companyAddress, name, phoneNumber, note } = req.body;
  if (password.length < 6) {
    return res.status(400).send({
      message: "Password too Short",
      success: false,
    });
  }
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

export { createUser };
