// routes/cart.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

// Cart APIs
router.post("/", auth, addToCart);                // add to cart
router.get("/", auth, getCart);                   // get cart
router.delete("/:productId", auth, removeFromCart); // remove item

module.exports = router;