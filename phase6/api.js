const express = require("express");
const pool = require("./db");
const CustomError = require("./utils/CustomError");

const router = express.Router();

// INSERT
router.post("/posting", (req, res, next) => {
  const { name, age, city } = req.body;

  if (!name || !age || !city) {
    const error = new CustomError("All fields are required", 400);
    return next(error);
  }

  const sql = "INSERT INTO viewtable (name, age, city) VALUES (?, ?, ?)";

  pool.query(sql, [name, age, city], (err) => {
    if (err) {
      const error = new CustomError("Error inserting data", 500);
      return next(error);
    }
    
    res.json({ message: "Data inserted successfully" });
  });
});

// READ
router.get("/viewing", (req, res, next) => {
  const sql = "SELECT * FROM viewtable";

  pool.query(sql, (err, results) => {
    if (err) {
      return next(new CustomError("Error retrieving data", 500));
    }

    res.json(results);
  });
});

// UPDATE
router.put("/updating/:id", (req, res, next) => {
  const { name, age, city } = req.body;
  const { id } = req.params;

  const sql = "UPDATE viewtable SET name=?, age=?, city=? WHERE id=?";

  pool.query(sql, [name, age, city, id], (err, result) => {
    if (err) {
      return next(new CustomError("Error updating data", 500));
    }

    res.json({ message: "Data updated successfully" });
  });
});

// DELETE
router.delete("/deleting/:id", (req, res, next) => {
  const { id } = req.params;

  const sql = "DELETE FROM viewtable WHERE id=?";

  pool.query(sql, [id], (err) => {
    if (err) {
      return next(new CustomError("Error deleting data", 500));
    }

    res.json({ message: "Data deleted successfully" });
  });
});

module.exports = router;
