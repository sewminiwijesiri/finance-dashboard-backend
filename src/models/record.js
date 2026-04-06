const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    notes: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Record", RecordSchema);
