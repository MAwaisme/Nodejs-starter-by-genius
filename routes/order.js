// routes/order.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { checkout,getAll } = require("../controllers/orderController");
const User = require("../models/User");

// Checkout
router.post("/checkout", auth, checkout);
router.get("/", auth, getAll);

module.exports = router;