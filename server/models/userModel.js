import { Schema, model } from 'mongoose';

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  // Add other user fields here
});

const User = model('User', userSchema);

export default User;