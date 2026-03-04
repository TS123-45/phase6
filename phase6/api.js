const express = require("express");
const pool = require("./db");

const router = express.Router();

// ---------- INSERT DATA ----------
router.post("/posting", (req, res) => {
  const { name, age, city } = req.body;

  const sql = "INSERT INTO viewtable (name, age, city) VALUES (?, ?, ?)";

  pool.query(sql, [name, age, city], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error inserting data",
        error: err.message,
      });
    }

    res.json({ message: "Data inserted successfully" });
  });
});

// ---------- GET ALL DATA ----------
router.get("/viewing", (req, res) => {
  const sql = "SELECT * FROM viewtable";

  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error retrieving data",
        error: err.message,
      });
    }

    res.json(results);
  });
});

// ---------- UPDATE DATA ----------
router.put("/updating/:id", (req, res) => {
  const { name, age, city } = req.body;
  const { id } = req.params;

  const sql = "UPDATE viewtable SET name = ?, age = ?, city = ? WHERE id = ?";

  pool.query(sql, [name, age, city, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error updating data",
        error: err.message,
      });
    }

    res.json({ message: "Data updated successfully" });
  });
});

// ---------- DELETE DATA ----------
router.delete("/deleting/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM viewtable WHERE id = ?";

  pool.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting data",
        error: err.message,
      });
    }

    res.json({ message: "Data deleted successfully" });
  });
});

module.exports = router;
