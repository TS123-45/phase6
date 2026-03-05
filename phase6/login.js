const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("./db");
const CustomError = require("./utils/CustomError");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new CustomError("All fields required", 400));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

    pool.query(sql, [username, hashedPassword], (err) => {
      if (err) {
        return next(new CustomError("username already exists", 500));
      }

      res.status(201).json({ message: "Signup successful" });
    });
  } catch (err) {
    next(err);
  }
});

// LOGIN
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username=?";

  pool.query(sql, [username], async (err, results) => {
    if (err) {
      return next(new CustomError("Database error", 500));
    }

    if (results.length === 0) {
      return next(new CustomError("User not found", 401));
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new CustomError("Invalid password", 401));
    }

    res.json({ message: "Login successful" });
  });
});

module.exports = router;
