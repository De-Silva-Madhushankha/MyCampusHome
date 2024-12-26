import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import universityRoutes from "./routes/universityRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware applied to all routes
app.use(express.json());
app.use(cors());

// Set strictQuery option
mongoose.set('strictQuery', true);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api/universities", universityRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
