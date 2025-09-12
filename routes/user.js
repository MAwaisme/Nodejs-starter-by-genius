// routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Create User
router.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Users
router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

module.exports = router;