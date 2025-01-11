import { verifyToken } from '../utils/jwtUtils.js';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = verifyToken(token); // Decode token
    const user = await User.findById(decoded.id); // Fetch user from database

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

export default authMiddleware;