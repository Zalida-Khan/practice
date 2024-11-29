require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const voteRoutes = require("./routes/voteRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:3000",  // Local frontend during development (React)
    "http://localhost:5173", // Local frontend during development (Vite)
    "https://aether-top-forms-leaderboard.vercel.app",  // Deployed frontend
  ],
  methods: "GET,POST",
  credentials: true,
};
app.use(cors(corsOptions));  // Apply CORS

// Middleware to parse JSON requests
app.use(express.json());

// Root route (for testing purposes)
app.get("/", (req, res) => {
  res.send("Welcome to the Aether Forms API!");
});

// Use the voteRoutes for /api/votes
app.use("/api/votes", voteRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
