const path = require("path");
const fs = require("fs");

exports.createUploadFolder = (_, res, next) => {
  const directoryPath = path.join(__dirname, "../..", "images");
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
  next();
};
