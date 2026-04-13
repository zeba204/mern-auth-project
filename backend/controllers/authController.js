const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // check user exists
    const [user] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await db.execute(
      "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)",
      [name, email, phone, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user[0].password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user[0].id);

    res.json({
      success: true,
      token,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
const crypto = require("crypto");

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [user] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // generate token
    const token = crypto.randomBytes(32).toString("hex");

    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // save token
    await db.execute(
      "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
      [token, expiry, email]
    );

    res.json({
      success: true,
      message: "Reset token generated",
      token, // show token (simulate email)
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const [user] = await db.execute(
      "SELECT * FROM users WHERE reset_token = ?",
      [token]
    );

    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    // check expiry
    if (new Date(user[0].reset_token_expiry) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Token expired",
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update password + clear token
    await db.execute(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
      [hashedPassword, user[0].id]
    );

    res.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
exports.getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};