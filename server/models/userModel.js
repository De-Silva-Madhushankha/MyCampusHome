import { Schema, model } from 'mongoose';

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone : {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  

});

const User = model('User', userSchema);

export default User;