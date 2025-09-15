// routes/order.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { checkout } = require("../controllers/orderController");

// Checkout
router.post("/checkout", auth, checkout);

module.exports = router;