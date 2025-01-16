import User from '../models/userModel.js';
import { generateTokenAndSetCookie } from '../utils/jwtUtils.js';

export const verifyUser = async (req, res) => {
  try {
    const user = req.user; // Comes from authMiddleware
    res.status(200).json({ message: "Token is valid", user });
  } catch (error) {
    res.status(500).json({ message: "Error verifying token", error: error.message });
  }
}


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: 'Invalid login credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid login credentials' });
    }

    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;

    if (userResponse) {
      //Generate jwt token here
      const token = generateTokenAndSetCookie(userResponse._id, res);
      res.status(200).send({ user: userResponse, token: token });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
}