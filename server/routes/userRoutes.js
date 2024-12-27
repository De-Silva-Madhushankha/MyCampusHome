import { Router } from 'express';
import { getUser, addUser, loginUser } from '../controllers/userController.js';
const router = Router();

router.get("/",getUser);
router.post("/login", loginUser);
router.post("/register", addUser);

export default router;