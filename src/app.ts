import express from "express";
import config from "config";
import ConnectDB from "./utils/connectDB";

const app = express();
const PORT = config.get("PORT") || 8000;
ConnectDB()

app.listen(PORT, () => console.log(`App Listening at port ${PORT}`));
