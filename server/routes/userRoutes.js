import { Router } from 'express';
import { getUser, loginUser, verifyUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();

router.get("/",getUser);
router.post("/login", loginUser);
router.get("/verify", authMiddleware, verifyUser);

export default router;