import config from "config"
import jwt from "jsonwebtoken"
export function generateJwt (payload: any) {
    const token = jwt.sign(payload, config.get<string>("JWT_SECRET_KEY"), {
        expiresIn: config.get("JWT_EXPIRY_TIME"),
      });
      return token
}