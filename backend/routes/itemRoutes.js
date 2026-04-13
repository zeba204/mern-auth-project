const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  getStats
} = require("../controllers/itemController");

const { protect } = require("../middleware/authMiddleware");

// protected routes
router.post("/", protect, createItem);
router.get("/", protect, getItems);
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);
router.get("/stats", protect, getStats);
module.exports = router;