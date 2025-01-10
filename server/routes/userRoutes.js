import { Router } from 'express';
import { getUser, addUser, loginUser } from '../controllers/userController.js';
import passport from 'passport';

const router = Router();

// Public Routes
router.post("/register", addUser);
router.post("/login", loginUser);

// Protected Route Example
router.get("/", passport.authenticate('jwt', { session: false }), getUser);

export default router;