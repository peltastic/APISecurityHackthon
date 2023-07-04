import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { IPayLoad } from "../interfaces/interfaces";

dotenv.config()


export interface CustomRequest extends Request {
    user: IPayLoad; 
  }

const authMiddleware = (req: Request, res: Response, next:NextFunction)=>{
    const bearerHeader = req.headers["authorization"]
    if (typeof bearerHeader === 'undefined') {
        return res.status(403).json({success:false, message:'A token is required for authentication'});
      }
      try {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
    
        const decoded = jwt.verify(token as string, process.env.JWT_TOKEN as string) as IPayLoad;
        (req as CustomRequest).user = decoded;
       // console.log(req.user);
       next()
      } catch (error) {
        console.log(error);
        return res.status(401).json({success:false, message:'Invalid Token'});
      }
    
}

export default authMiddleware