const Record = require("../models/Record");

exports.createRecord = async (req, res) => {
    try {
        const record = await Record.create({
            ...req.body,
            createdBy: req.user.id
        });
        res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getRecords = async (req, res) => {
    try {
        const filters = req.query;
        const records = await Record.find(filters);
        res.json(records);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteRecord = async (req, res) => {
    try {
        await Record.findByIdAndDelete(req.params.id);
        res.json({ message: "Record deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.summary = async (req, res) => {
    try {
        const records = await Record.find();

        const totalIncome = records
            .filter(r => r.type === "income")
            .reduce((sum, r) => sum + r.amount, 0);

        const totalExpense = records
            .filter(r => r.type === "expense")
            .reduce((sum, r) => sum + r.amount, 0);

        res.json({
            totalIncome,
            totalExpense,
            netBalance: totalIncome - totalExpense
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};