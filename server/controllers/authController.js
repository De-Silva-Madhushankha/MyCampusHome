import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler.js';
import { generateTokenAndSetCookie } from '../utils/jwtUtils.js';

export const signup = async (req, res, next) => {

    try {
        const {firstname, lastname, email, password} = req.body;
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