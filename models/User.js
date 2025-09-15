const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: { type: String }, // file path or filename
    createdAt: { type: Date, default: Date?.now() },

    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // 👈 add this
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema)