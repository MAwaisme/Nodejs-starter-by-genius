const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken, successResponse, errorResponse } = require("../utils/helpers");

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return errorResponse(res, "User already exists", 400);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        successResponse(res, {
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email }
        }, "User registered successfully");
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return errorResponse(res, "Invalid credentials", 400);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return errorResponse(res, "Invalid credentials", 400);

        successResponse(res, {
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email }
        }, "Login successful");
    } catch (err) {
        errorResponse(res, err.message);
    }
};