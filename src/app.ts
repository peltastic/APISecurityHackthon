import express, {Request, Response, NextFunction} from "express";
import config from "config";
import ConnectDB from "./utils/connectDB";
import cors from "cors"

const app = express();


app.options('*', cors()); // preflight OPTIONS; put before other routes

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
const PORT = config.get("PORT") || 8000;
ConnectDB()

app.listen(PORT, () => console.log(`App Listening at port ${PORT}`));
