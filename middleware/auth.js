const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ msg: "No token, authorization denied" });
    }

    try {
        // Remove 'Bearer ' if included
        const realToken = token.startsWith("Bearer ")
            ? token.slice(7, token.length).trim()
            : token;

        const decoded = jwt.verify(realToken, process.env.JWT_SECRET);
        req.user = decoded; // add user info to request
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
        console.log(err);
    }
}

module.exports = authMiddleware;