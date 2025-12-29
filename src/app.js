const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes"); // <-- add this
const auth = require("./middleware/auth");

require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();

// Auth routes
app.use("/api/auth", authRoutes);

// Product routes
app.use("/api/products", productRoutes); // <-- add this

// Protected admin route
app.get("/api/admin", auth(["admin"]), (req, res) => {
  res.json({ message: "Hello Admin", user: req.user });
});

// Protected user route
app.get("/api/user", auth(["user", "admin"]), (req, res) => {
  res.json({ message: "Hello User", user: req.user });
});

module.exports = app;
