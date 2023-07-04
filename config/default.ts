import dotenv from "dotenv"
dotenv.config()

const config = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRY_TIME: process.env.JWT_EXPIRY_TIME,
    JWT_TOKEN: process.env.JWT_TOKEN,   
    TREBLLE_API_KEY: process.env.TREBLLE_API_KEY,
    TREBLLE_PROJECT_ID :process.env.TREBLLE_PROJECT_ID
}

export default config