const mongoose = require("mongoose");
const { DBURI } = require("../../utils/index");

mongoose.connect(DBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("database connection error:", error);
  process.exit(1);
});

db.once("open", () => {
  console.log("database connected successfully");
});

module.exports = db;
