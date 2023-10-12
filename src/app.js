const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser")

const db = require("./config/db");

const routes = require("./routes/index");
const path = require("path");

// dev logs
const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(fileUpload());

app.use("/images", express.static(path.join(__dirname, "../images")));

app.use(routes);

app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "MongoDB../robots.txt"));
});

app.all("*", (_, res) => {
  res.status(404).json({ status: 404, message: "Not found" });
});

module.exports = app;
