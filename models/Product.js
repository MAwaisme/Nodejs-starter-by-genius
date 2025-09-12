// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name required"], trim: true },
    price: { type: Number, required: [true, "Price required"], min: [0, "Price must be >= 0"] },
    description: { type: String, default: "" },
    // image: { type: String, default: "" }, // will store a public URL/path
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);