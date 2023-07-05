import express from "express"
import { createUser, loginUser } from "../controllers/users.controller"
import validateSchema from "../middlewares/validateSchema"
import { createUserSchema, loginUserSchema } from "../schema/users.schema"
import { createLimiter } from "../middlewares/rateLimiter.middleware"

const router = express.Router()

router.post("/login-user", createLimiter("You have exceeded the 5 requests in 1 minute limit!", 1, 5),validateSchema(loginUserSchema) ,loginUser)
router.post("/create-user", createLimiter("You have exceeded the 5 requests in 1 minute limit!", 1, 5),validateSchema(createUserSchema), createUser)

export default router