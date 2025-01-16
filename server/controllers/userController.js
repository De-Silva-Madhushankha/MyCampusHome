import User from '../models/userModel.js';


export const verifyUser = async (req, res) => {
  try {
    const user = req.user; // Comes from authMiddleware
    res.status(200).json({ message: "Token is valid", user });
  } catch (error) {
    res.status(500).json({ message: "Error verifying token", error: error.message });
  }
}




export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
}