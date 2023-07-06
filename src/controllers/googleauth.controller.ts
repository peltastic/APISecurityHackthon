import { Request, Response, NextFunction } from "express";
import {  CreateUser,  } from "../services/users.service";
import { OAuth2Client } from 'google-auth-library';
import config from "config"

import UserModel from "../models/users.model";

const client = new OAuth2Client(config.get("GOOGLE_CLIENT_ID"));
const clientId = config.get("GOOGLE_CLIENT_ID")


const initiateGoogleAuth = async(
  req: Request,
  res: Response,
  next: NextFunction
)=>{
 
  const url = client.generateAuthUrl({
    scope: 'email profile', 

    redirectUri: 'http://localhost:3000/auth/google/redirect',
  });
  res.redirect(url);
}

const handleSuccessfulAuth = async(
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  const { code } = req.query;

  try {
  
    const { tokens } = await client.getToken(code as string);

   
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: clientId as string,
    });
    const payload = ticket.getPayload();
    const userId = payload?.sub;
    const email = payload?.email;
    const firstName = payload?.given_name;
  
    const existingUser = await UserModel.findOne({ email });
    if(existingUser){
      return res.status(200).json({success: true, message:"Authentication Successful"})
    }
    await CreateUser({
      email : email!,
      name :firstName!,
      password:"GoogleAuth"
    
    });
    return res.status(200).json({success: true, message:"Authentication Successful"})
  } catch (e) {
    next(e)
  }
}

export {handleSuccessfulAuth, initiateGoogleAuth}