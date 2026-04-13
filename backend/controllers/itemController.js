const db = require("../config/db");


// CREATE ITEM
exports.createItem = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    await db.execute(
      "INSERT INTO items (user_id, title, description, status) VALUES (?, ?, ?, ?)",
      [req.user.id, title, description, status]
    );

    res.status(201).json({
      success: true,
      message: "Item created",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// GET ALL ITEMS (USER SPECIFIC)
exports.getItems = async (req, res) => {
  try {
    const [items] = await db.execute(
      "SELECT * FROM items WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json({
      success: true,
      items,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// UPDATE ITEM
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Get existing item first
    const [existing] = await db.execute(
      "SELECT * FROM items WHERE id=? AND user_id=?",
      [id, req.user.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const current = existing[0];

    await db.execute(
      "UPDATE items SET title=?, description=?, status=? WHERE id=? AND user_id=?",
      [
        title || current.title,
        description || current.description,
        status || current.status,
        id,
        req.user.id,
      ]
    );

    res.json({
      success: true,
      message: "Item updated",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// DELETE ITEM
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      "DELETE FROM items WHERE id=? AND user_id=?",
      [id, req.user.id]
    );

    res.json({
      success: true,
      message: "Item deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// DASHBOARD STATS
exports.getStats = async (req, res) => {
  try {
    const [stats] = await db.execute(
      `SELECT 
        COUNT(*) as total,
        SUM(status='active') as active,
        SUM(status='pending') as pending,
        SUM(status='completed') as completed
       FROM items
       WHERE user_id = ?`,
      [req.user.id]
    );

    res.json({
      success: true,
      stats: stats[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};