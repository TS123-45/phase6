const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const loginfile = require("./login.js");
const apifile = require("./api.js");

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loginfile);
app.use(apifile);

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get(/^\/create(?:\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "create.html"));
});

app.get(/^\/read(?:\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "read.html"));
});

app.get(/^\/update(?:\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "update.html"));
});

app.get(/^\/delete(?:\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "delete.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});