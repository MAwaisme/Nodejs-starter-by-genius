const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        // Remove 'Bearer ' if included
        const realToken = token.startsWith("Bearer ")
            ? token.slice(7).trim()
            : token;

        const decoded = jwt.verify(realToken, process.env.JWT_SECRET);

        // ✅ Only store the user info inside token (usually decoded.user)
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, message: "Token is not valid" });
    }
}

module.exports = authMiddleware;