import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import * as fs from "fs";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index";
import config from "./utils/index"
const app = express();
mongoose.connect(config.DBURI as string);
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Database connection error:", error);
  process.exit(1);
});
db.once("open", () => {
  console.log("Database connected successfully");
});
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
const createUploadFolder = () => {
  const directoryPath = path.join(__dirname, "..", "images");
  if (!fs.existsSync(directoryPath)) {
    fs.mkdir(directoryPath, (error) => {
      if (error) {
        console.log(error);
      }
    })
  }
};
createUploadFolder()
app.use("/images", express.static(path.join(__dirname, "..", 'images')));
app.use(routes);
app.get("/robots.txt", (_, res) => {
  res.sendFile(path.join(__dirname, "robots.txt"));
});
app.all("*", (_, res) => {
  res.status(404).json({ status: 404, message: "Not found" });
});
export default app;
