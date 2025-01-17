import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  role : {
    type: String,
    required: true,
    default: 'user',
  },

}, { timestamps: true });


const User = model('User', userSchema);

export default User;