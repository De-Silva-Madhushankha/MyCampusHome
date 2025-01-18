import { Router } from 'express';
import { getUser, verifyUser, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { verifyToken } from '../utils/jwtUtils.js';
const router = Router();

router.get("/",getUser);
router.post("/update/:id", verifyToken, updateUser);
router.get("/verify", authMiddleware, verifyUser);

export default router;