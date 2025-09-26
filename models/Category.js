const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // the user who created the category
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Category", categorySchema);