const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "No token provided" });

    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch latest user status from DB to enforce real-time deactivation
        const user = await User.findById(decoded.id);

        if (!user || user.isDeleted) {
            return res.status(401).json({ message: "User not found or account deleted" });
        }

        if (user.status !== "active") {
            return res.status(403).json({ message: "Access denied. Your account is currently inactive." });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
