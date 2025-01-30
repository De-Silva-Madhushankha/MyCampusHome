import mongoose from "mongoose";

// Define OTP schema
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Add TTL index
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Export the model
export const Otp = mongoose.model("Otp", otpSchema);
