const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Article title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true, // ✅ ensures slug is unique
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        author: {
            type: String, // free-text author name (optional)
            default: "",
            trim: true,
        },
        writerName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // linked to User collection
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);