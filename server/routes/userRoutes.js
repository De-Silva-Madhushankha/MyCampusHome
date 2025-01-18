import { Router } from 'express';
import { getUser, verifyUser, updateUser, deleteUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { verifyToken } from '../utils/jwtUtils.js';
const router = Router();


router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/",getUser);
router.get("/verify", authMiddleware, verifyUser);

export default router;