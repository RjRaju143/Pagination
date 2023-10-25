import { Request, Response, NextFunction } from "express";
import * as path from "path";
import * as fs from "fs";

export const createUploadFolder = (_: Request, res: Response, next: NextFunction) => {
  const directoryPath = path.join(__dirname, "../..", "images");
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
  next();
};

