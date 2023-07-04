import express from "express"
import { disableOtp, generateOTP, validateOTP, verifyOTp } from "../controllers/auth.controller"

const router = express.Router()

router.post("/otp/generate", generateOTP)
router.post("/otp/verify", verifyOTp)
router.post("/otp/validate", validateOTP)
router.post("/otp/disable", disableOtp)

export default router