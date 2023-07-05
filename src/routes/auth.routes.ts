import express from "express"
import { disableOtp, generateOTP, validateOTP, verifyOTp } from "../controllers/auth.controller"
import { createLimiter } from "../middlewares/rateLimiter.middleware"

const router = express.Router()

router.post("/otp/generate",   createLimiter("You have exceeded the 1 requests in 1 minute limit!", 1, 1),generateOTP)
router.post("/otp/verify", createLimiter("You have exceeded the 3 requests in 1 minute limit!", 1, 3),verifyOTp)
router.post("/otp/validate", createLimiter("You have exceeded the 3 requests in 1 minute limit!", 1,3),validateOTP)
router.post("/otp/disable", createLimiter("You have exceeded the 3 requests in 1 minute limit!", 1, 3),disableOtp)

export default router