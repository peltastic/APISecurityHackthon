import dotenv from "dotenv"
dotenv.config()

const config = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRY_TIME: process.env.JWT_EXPIRY_TIME
}

export default config