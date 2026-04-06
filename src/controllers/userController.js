const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, role, status } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, role, status },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};
