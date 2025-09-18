const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        const realToken = token.startsWith("Bearer ")
            ? token.slice(7).trim()
            : token;

        const decoded = jwt.verify(realToken, process.env.JWT_SECRET);
        console.log("✅ Decoded JWT:", decoded);

        const user = await User.findById(decoded._id).select("-password");

        console.log("user get:::::==========>>>>>>>>", user);
        

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user; // 👈 actual DB user object
        next();
    } catch (err) {
        console.error("❌ JWT error:", err.message);
        return res.status(401).json({ success: false, message: "Token is not valid" });
    }
}

module.exports = authMiddleware;