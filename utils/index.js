require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8000,
  DBURI: process.env.DBURI,
};
