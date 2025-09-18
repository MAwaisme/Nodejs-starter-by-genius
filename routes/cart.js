// routes/cart.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addToCart, getCart, removeFromCart, checkout } = require("../controllers/cartController");

// Cart APIs
router.post("/", auth, addToCart);                  // add to cart
router.get("/getCart", auth, getCart);              // get cart
router.delete("/:productId", auth, removeFromCart); // remove item
router.post("/checkout", auth, checkout);           // checkout / create order ✅

module.exports = router;