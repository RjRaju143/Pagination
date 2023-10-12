const express = require("express");
const router = express.Router();

const Students = require("../models/student");

const paginatedResults = require("../middlewares/paginatedResults.js");

const { createUploadFolder } = require("../config/createUploadFolder");

const { studentDetailsRegister } = require("../controllers/index");

// GET http://localhost:8000/students?page=1&limit=3
router.get("/students", paginatedResults(Students), (req, res) => {
  res.status(200).json(res.paginatedResults);
});

// POST http://localhost:8000/
router.post("/", createUploadFolder, studentDetailsRegister);

module.exports = router;
