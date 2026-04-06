const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
    amount: Number,
    type: { type: String, enum: ["income", "expense"] },
    category: String,
    date: Date,
    notes: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Record", RecordSchema);