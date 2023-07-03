import mongoose from "mongoose";
import config from "config"

export default async function ConnectDB() {
  try {
    await mongoose.connect(config.get("MONGO_URL"));
    console.log("Connected To Db")
  } catch (err) {
    console.log(err);
  }
}
