import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import universityRoutes from "./routes/universityRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import accommodationRoutes from "./routes/accommodationRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:4000', 'http://localhost:3000'],  // Add any other allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Enable credentials (cookies, authorization headers, etc)
  optionsSuccessStatus: 200
};

// Middleware applied to all routes
app.use(express.json());
app.use(cors(corsOptions));

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
app.use("/api/listing", listingRoutes);
app.use("/api/accommodation", accommodationRoutes);

console.log("Routes setup complete");

app.get('/', (req, res) => {
  res.send('server is running');
})

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://${HOST}:${PORT}`);
})
