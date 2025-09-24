// routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const { toggleFavorite, getFavorites } = require("../controllers/userController");
const router = express.Router();
const auth = require("../middleware/auth");


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

// Favorite APIs
router.post("/favorites/:productId", auth, toggleFavorite);  // toggle add/remove
router.get("/favorites", auth, getFavorites);               // get all favorites

module.exports = router;