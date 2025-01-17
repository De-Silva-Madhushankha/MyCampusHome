import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import universityRoutes from "./routes/universityRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import accommodationRoutes from "./routes/accommodationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import CookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";


const corsOptions = {
  origin: ['http://localhost:4000', 'http://localhost:3000', 'http://localhost:5173' ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Enable credentials (cookies, authorization headers, etc)
  optionsSuccessStatus: 200
};

// Middleware applied to all routes
app.use(express.json());
app.use(cors(corsOptions));
app.use(CookieParser());

// Set strictQuery option
mongoose.set('strictQuery', true);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/accommodation", accommodationRoutes);

console.log("Routes setup complete");

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success : false,
    message,
    statusCode });
})


app.get('/', (req, res) => {
  res.send('server is running');
})

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://${HOST}:${PORT}`);
})
