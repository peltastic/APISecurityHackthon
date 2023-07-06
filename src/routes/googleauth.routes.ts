import express from "express"
import  {handleSuccessfulAuth, initiateGoogleAuth} from "../controllers/googleauth.controller"


const router = express.Router()

router.get("/auth/google", initiateGoogleAuth)
router.get("/auth/google/redirect", handleSuccessfulAuth)

export default router