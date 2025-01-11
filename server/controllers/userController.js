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

export const addUser = async (req, res) => {
  try {
    const { googleId, firstName, lastName, email, password, role } = req.body;

    // Prevent registration if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'User with this email already exists.' });
    }

    const user = new User({
      googleId,
      firstName,
      lastName,
      email,
      password, // Can be empty for OAuth users
      role: role || 'user',
    });

    await user.save();

    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;
    if (userResponse) {
      //Generate jwt token here
      const token = generateTokenAndSetCookie(userResponse._id, res);
      res.status(200).send({ user: userResponse, token: token });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ error: 'Email already exists' });
    }
    console.log('Error registering user:', error); // for debugging
    res.status(400).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }

    if (user.googleId && !password) {
      return res.status(401).send({ error: 'Please use Google OAuth to login' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid login credentials' });
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
    res.status(400).send({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};