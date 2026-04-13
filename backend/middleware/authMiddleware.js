const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const [user] = await db.execute(
      "SELECT id, name, email FROM users WHERE id = ?",
      [decoded.id]
    );

    if (user.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user[0];

    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token not valid",
    });
  }
};