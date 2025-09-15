// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { logRequest } = require("./utils/helpers");

// Swagger dependencies
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Logger
app.use((req, res, next) => {
    logRequest(req);
    next();
});

// Swagger setup
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log("👉 Mounting routes...");
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/products", require("./routes/product"));

console.log("👉 Routes mounted!");

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📘 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});