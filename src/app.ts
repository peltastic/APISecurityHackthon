import express from "express";
import config from "config";
import ConnectDB from "./utils/connectDB";
import userRoutes from "./routes/user.routes"

const app = express();
const PORT = config.get("PORT") || 8000;

ConnectDB()

app.use(express.json())

app.use("/api/v1/users", userRoutes)

app.listen(PORT, () => console.log(`App Listening at port ${PORT}`));
