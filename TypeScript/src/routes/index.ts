import express, { Router, Response, Request } from "express";
import Students from "../models/student";
import paginatedResults from "../middlewares/paginatedResults";
import { createUploadFolder } from "../config/createUploadFolder";
import { studentDetailsRegister } from "../controllers/index";

const router: Router = express.Router();

interface CustomResponse extends Response {
  paginatedResults?: any;
}

// GET http://localhost:8000
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: `Hello World` });
});


// GET http://localhost:8000/students?page=1&limit=3
router.get("/students", paginatedResults(Students), (req, res: CustomResponse) => {
  res.status(200).json(res.paginatedResults);
});

// POST http://localhost:8000/
router.post("/", createUploadFolder, studentDetailsRegister);

export default router;
