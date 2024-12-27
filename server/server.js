import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import universityRoutes from "./routes/universityRoutes.js";
import userRoutes from "./routes/userRoutes.js";

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
app.use("/api/user", userRoutes);

console.log("Routes setup complete");

app.get('/', (req, res) => {
  res.send('server is running');
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
})
