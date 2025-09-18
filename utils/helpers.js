const jwt = require("jsonwebtoken");

// Format success response
exports.successResponse = (res, data, message = "Success") => {
    return res.status(200).json({ success: true, message, data });
};

// Format error response
exports.errorResponse = (res, message = "Server error", statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message });
};

// Generate JWT Token
exports.generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: "12h" });
};

// Simple request logger
exports.logRequest = (req) => {
    console.log(`
========================
📡 [${req.method}] ${req.originalUrl}
📦 Payload: ${JSON.stringify(req.body, null, 2)}
========================
  `);
};