import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";

import authRoutes from "./routes/authRoutes.js";
import universityRoutes from "./routes/universityRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import accommodationRoutes from "./routes/accommodationRoutes.js";

// Initialize environment variables
dotenv.config();

// Import Passport configuration
import "./config/passport.js";

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

// Middleware

// Parse incoming JSON requests
app.use(express.json());

// Configure cookie-session
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [process.env.COOKIE_KEY],
    secure: process.env.NODE_ENV === "production", // Secure cookies in production
  })
);

// Initialize Passport and manage sessions
app.use(passport.initialize());
app.use(passport.session());

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/auth", authRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/user", userRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/accommodation", accommodationRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start Server
app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://${HOST}:${PORT}`);
});