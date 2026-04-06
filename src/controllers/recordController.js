const Record = require("../models/record");

exports.createRecord = async (req, res) => {
    try {
        const { amount, type, category, date, notes, description, user } = req.body;
        
        const record = await Record.create({
            amount,
            type,
            category,
            date,
            notes,
            description,
            user: user || req.user.id, // Target user (defaults to self if not provided)
            createdBy: req.user.id     // Admin who created the record
        });
        res.status(201).json(record);
    } catch (err) {
        if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};

exports.getRecords = async (req, res) => {
    try {
        const { type, category, startDate, endDate, keyword, page = 1, limit = 10 } = req.query;
        let query = { isDeleted: false };

        // Users see records assigned to them
        query.user = req.user.id;

        if (type) query.type = type;
        if (category) query.category = category;
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        if (keyword) {
            query.$or = [
                { category: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { notes: { $regex: keyword, $options: "i" } }
            ];
        }

        const skip = (page - 1) * limit;
        const total = await Record.countDocuments(query);
        const records = await Record.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.json({
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / limit),
            records
        });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};


exports.updateRecord = async (req, res) => {
    try {
        // Admins can update records. Ensure the record is not deleted.
        const record = await Record.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            req.body,
            { new: true, runValidators: true }
        );
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.json(record);
    } catch (err) {
        if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};

exports.deleteRecord = async (req, res) => {
    try {
        // Admins can delete records.
        const record = await Record.findOneAndUpdate(
            { _id: req.params.id },
            { isDeleted: true },
            { new: true }
        );
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.json({ message: "Record deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};

exports.summary = async (req, res) => {
    try {
        const userId = req.user.id;
        // Summarize records assigned to the user
        const records = await Record.find({ user: userId, isDeleted: false }).sort({ date: -1 });

        const totalIncome = records
            .filter(r => r.type === "income")
            .reduce((sum, r) => sum + r.amount, 0);

        const totalExpense = records
            .filter(r => r.type === "expense")
            .reduce((sum, r) => sum + r.amount, 0);

        // Category-wise summary
        const categoryWiseTotals = records.reduce((acc, r) => {
            if (!acc[r.category]) acc[r.category] = { income: 0, expense: 0, total: 0 };
            if (r.type === "income") acc[r.category].income += r.amount;
            else acc[r.category].expense += r.amount;
            acc[r.category].total += (r.type === "income" ? r.amount : -r.amount);
            return acc;
        }, {});

        // Monthly trends
        const monthlyTrends = records.reduce((acc, r) => {
            if (!r.date) return acc;
            const month = new Date(r.date).toLocaleString("default", { month: "short", year: "numeric" });
            if (!acc[month]) acc[month] = { income: 0, expense: 0 };
            if (r.type === "income") acc[month].income += r.amount;
            else acc[month].expense += r.amount;
            return acc;
        }, {});

        res.json({
            summary: {
                totalIncome,
                totalExpense,
                netBalance: totalIncome - totalExpense,
            },
            categoryWiseTotals,
            monthlyTrends,
            recentActivity: records.slice(0, 5)
        });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};
