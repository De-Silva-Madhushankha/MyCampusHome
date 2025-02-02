import User from '../models/userModel.js';
import { errorHandler } from '../utils/errorHandler.js';
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {

  if (req.params.id !== req.user.id) {
    return next(errorHandler(403, 'Forbidden'));
  }
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id,
      { $set:  {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        profilePicture: req.body.profilePicture,
      }
    }, { new: true });
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  }
  catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(403, 'Forbidden'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
}





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

export const getFavoriteAccommodations = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('FavoriteAccommodations');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.FavoriteAccommodations || []);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch favorite accommodations', 
      error: error.message 
    });
  }
};

export const removeFavoriteAccommodation = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.FavoriteAccommodations = user.FavoriteAccommodations.filter(
      (propertyId) => propertyId.toString() !== req.params.propertyId
    );

    await user.save();
    res.status(200).json(user.FavoriteAccommodations);
  }
  catch (error) {
    res.status(500).json({ 
      message: 'Failed to remove favorite accommodation', 
      error: error.message 
    });
  }
}

export const addFavoriteAccommodation = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.FavoriteAccommodations.includes(req.params.propertyId)) {
      return res.status(400).json({ message: 'Property already in favorites' });
    }

    user.FavoriteAccommodations.push(req.params.propertyId);
    await user.save();
    res.status(200).json(user.FavoriteAccommodations);
  }
  catch (error) {
    res.status(500).json({ 
      message: 'Failed to add favorite accommodation', 
      error: error.message 
    });
  }
}
