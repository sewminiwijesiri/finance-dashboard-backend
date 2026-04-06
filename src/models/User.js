const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["viewer", "analyst", "admin"],
        default: "viewer",
        required: true
    },
    status: { type: String, enum: ["active", "inactive"], default: "active", required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);