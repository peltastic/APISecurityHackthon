import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt"

interface IUser {
  name: string;
  phoneNumber: string;
  email: string;
  note: string;
  companyAddress: string;
  password: string;
  otp_enabled: boolean
  otp_verified: boolean
  otp_ascii: string
  otp_hex: string
  otp_base32: string
  otp_auth_url: string
  _id: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, min: 11 },
  email: { type: String, required: true },
  note: { type: String },
  companyAddress: { type: String, required: true },
  _id: { type: String, default: () => uuidv4()},
  otp_ascii: {type: String},
  otp_auth_url: {type: String},
  otp_base32: {type: String},
  otp_enabled: {type: Boolean, default: false},
  otp_hex: {type: String},
  otp_verified: {type: Boolean, default: false},
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
