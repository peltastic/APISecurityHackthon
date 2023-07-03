import express from "express"
import { createUser, loginUser } from "../controllers/users.controller"
import validateSchema from "../middlewares/validateSchema"
import { createUserSchema, loginUserSchema } from "../schema/users.schema"

const router = express.Router()

router.post("/login-user", validateSchema(loginUserSchema) ,loginUser)
router.post("/create-user", validateSchema(createUserSchema), createUser)

export default router