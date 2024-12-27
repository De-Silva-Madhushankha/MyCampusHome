import User from '../models/userModel.js';

export const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).send(userResponse);
  } catch (error) {
    res.status(400).send(error);
  }   
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }

    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;
    res.send(userResponse);
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