import express, {Request, Response, NextFunction} from "express";
import config from "config";
import ConnectDB from "./utils/connectDB";
import cors from "cors"
import { useTreblle } from "treblle";

import errorMiddleware from "./middlewares/error.middleware";
import authMiddleware from "./middlewares/auth.middleware"
// import { rateLimiter } from "./middlewares/rateLimiter.middleware";
import compression from "compression"

//Import routes
import userRoutes from "./routes/user.routes"
import clientRoutes from "./routes/client.routes"
import invoiceRoutes from "./routes/invoice.routes";
import authRoutes from "./routes/auth.routes"

const app = express();


//enable cors
app.options('*', cors()); // preflight OPTIONS; put before other routes

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
const PORT = config.get("PORT") || 3000;

ConnectDB()
const shouldCompress = (req: Request, res: Response) => {
  if (req.headers['x-no-compression']) {
    // Will not compress responses, if this header is present
    return false;
  }
  // Resort to standard compression
  return compression.filter(req, res);
};

app.use(compression({
  filter: shouldCompress,
  threshold: 0
}))

app.use(express.json())

app.use(errorMiddleware)

//enable rate Limit
// app.use(rateLimiter)


//set up treblle
useTreblle(app, {
    apiKey: config.get('TREBLLE_API_KEY'),
    projectId: config.get('TREBLLE_PROJECT_ID'),
  })

  app.get("/", (req: Request, res: Response) => {
    return res.send("Welcome")
  })

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/clients", authMiddleware, clientRoutes)
app.use("/api/v1/invoice", authMiddleware, invoiceRoutes)




app.listen(PORT, () => console.log(`App Listening at port ${PORT}`));

