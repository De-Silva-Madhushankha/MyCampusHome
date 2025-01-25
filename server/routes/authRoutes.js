import express from 'express';
import { signup, signin, google, signout,resetPasswordOtp,verifyOtp,requestOtp} from '../controllers/authController.js';


const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google )
router.get("/signout", signout)


//OTP base
router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password-otp", resetPasswordOtp);

export default router;