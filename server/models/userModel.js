import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = Schema({
  googleId: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
    // Make password required only if googleId is not present
    required: function () {
      return !this.googleId;
    },
  },
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false; // Cannot compare if no password set
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);

export default User;