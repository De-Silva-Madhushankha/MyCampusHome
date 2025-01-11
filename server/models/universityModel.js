import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  id : { type : Number, required : true },
  name: { type: String, required: true },
  type: { type: String, enum: ["Public", "Private"], required: true },
  location: { type: String, required: true },
  description: { type: String },
  logo: { type: String },
  createdAt: { type: Date, default: Date.now },
  lat:{ type: Number, required: true },
  lng: { type: Number, required: true },
});

export default mongoose.model("University", universitySchema);
