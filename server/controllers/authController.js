import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    try {
        const {firstname, lastname, username, email, password} = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = new User({
          firstname,
          lastname,
          email,
          password: hashedPassword,
        });
        await user.save();
        // Don't send password in response
        const userResponse = user.toObject();
        delete userResponse.password;
        if (userResponse) {
          //Generate jwt token here
          //const token = generateTokenAndSetCookie(userResponse._id, res);
          res.status(201).send({ message: "User created successfully", user: userResponse });
        }
      } catch (error) {
        if (error.code === 11000) {
          return res.status(400).send({ message: 'Email already exists' });
        }
        console.log('Error registering user:', error); // for debugging
        next(error);
      }
}