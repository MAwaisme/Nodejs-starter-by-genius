const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // make sure you create an "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// REGISTER
router.post("/register", async (req, res) => {
    console.log("=== REGISTER ROUTE HIT ===");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try {
        const { name, email, password } = req.body;
        const pic = req.file ? req.file.filename : null;

        console.log("Parsed Data:", { name, email, password, pic });

        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists");
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, pic });
        await user.save();

        console.log("✅ User saved successfully");

        res.status(201).json({
            msg: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic
            }
        });
    } catch (err) {
        console.error("❌ ERROR in Register Route:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

router.get("/checking", async (req, res) => {
    console.log("=== REGISTER ROUTE HIT ===");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    console.log("checking.....>>>>>>>>=====");
    res.status(201).json({
        msg: "User registered successfully",
    });
});


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // res.json({ token });
        // Convert user doc to object and remove password
        const userData = user.toObject();
        delete userData.password;

        // ✅ Return complete user + token
        res.json({
            success: true,
            token,
            user: userData
        });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// PROTECTED PROFILE ROUTE
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;