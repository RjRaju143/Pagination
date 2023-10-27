import { Request, Response } from "express";
import { registerStudent } from "../services/studentService"
import { UploadedFile } from "express-fileupload";
export const studentDetailsRegister = async (req: Request, res: Response) => {
  try {
    const { photo }: any = req.files;
    const photoFile = photo as UploadedFile | UploadedFile;
    const { email, mobile, fname, lname, dob, year, present_address, perm_address, place } = req.body;
    const result = await registerStudent(
      photoFile,
      email,
      mobile,
      fname,
      lname,
      dob,
      year,
      present_address,
      perm_address,
      place
    );
    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
