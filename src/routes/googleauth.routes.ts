import express from "express"
import  {handleSuccessfulAuth, initiateGoogleAuth} from "../controllers/googleauth.controller"


const router = express.Router()

router.post("/auth/google", initiateGoogleAuth)
router.post("/auth/google/redirect", handleSuccessfulAuth)

export default router