const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("🚀 Finance Dashboard API is Running...");
});

// Import and use routes here
// Example: app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
