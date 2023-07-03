import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt"

interface IUser {
  name: string;
  phoneNumber: string;
  email: string;
  note: string;
  companyAddress: string;
  password: string;
  _id: any;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, min: 11 },
  email: { type: String, required: true },
  note: { type: String },
  companyAddress: { type: String, required: true },
  _id: { type: "UUID", default: () => randomUUID() },
  password: { type: String, required: true, min: 6 },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 14);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
