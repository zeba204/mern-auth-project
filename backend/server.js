const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// auth routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const { protect } = require("./middleware/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});
