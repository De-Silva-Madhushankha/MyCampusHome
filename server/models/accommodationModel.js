import mongoose from "mongoose";

const accommodationSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  nearestUniversity: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  furnished: {
    type: Boolean,
    default: false,
  },
  area: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  deposit: {
    type: Number,
    required: true,
  },
  billsIncluded: {
    type: Boolean,
    default: false,
  },
  minimumStay: {
    type: Number,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  availableFrom: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Occupied"],
    default: "Available",
  },
}, { timestamps: true });

export default mongoose.model("Accommodation", accommodationSchema);