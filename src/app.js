const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running...");
});