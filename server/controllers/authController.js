import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler.js';
import { generateTokenAndSetCookie, clearCookie } from '../utils/jwtUtils.js';

export const signup = async (req, res, next) => {

  try {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password; // Remove password from response

    if (userResponse) {
      res.status(201).send({ message: "User created successfully", user: userResponse });
    }
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, 'Email already exists'));
    }
    next(error);
  }
}


export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const isMatch = await bcryptjs.compare(password, validUser.password);
    if (!isMatch) {
      return next(errorHandler(401, 'Invalid credentials'));
    }

    const { password: hashedPassword, ...rest } = validUser._doc;

    if (validUser) {
      const token = generateTokenAndSetCookie(validUser._id, res);
      res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { firstname, lastname, email, photo } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const geratedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(geratedPassword, 10);

      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        profilePicture: photo,
      });
      await newUser.save();
      const token = generateTokenAndSetCookie(newUser._id, res);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      res.status(200).json(rest);
      
    } else {
      const token = generateTokenAndSetCookie(user._id, res);
      const { password: hashedPassword , ...rest } = user._doc;
      res.status(200).json(rest);
    }
  }
  catch (error) {
    next(error);
  }
}

export const signout = (req, res,) => {
  clearCookie(res);
}
