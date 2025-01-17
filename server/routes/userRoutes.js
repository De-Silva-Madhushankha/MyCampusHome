import { Router } from 'express';
import { getUser, verifyUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();

router.get("/",getUser);
router.get("/verify", authMiddleware, verifyUser);

export default router;