import { Request, Response } from "express";
import path from "path";
import validator from "validator";
import StudentModel from "../models/student";
import { UploadedFile } from "express-fileupload";

export const studentDetailsRegister = async (req: Request, res: Response) => {
  try {
    const { photo }: any = req.files
    const photoFile = photo as UploadedFile | UploadedFile;

    const { email, mobile, fname, lname, dob, year, present_address, perm_address, place } = req.body;
    const fileName = new Date().getTime() + path.extname(photoFile.name);
    const folderName = "images";
    const savePath = path.join(__dirname, "../..", folderName, fileName);

    await photoFile.mv(savePath);

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ error: "Invalid mobile number" });
    }

    const studentData = {
      fname,
      lname,
      email,
      mobile: parseInt(mobile),
      dob,
      year: parseInt(year),
      present_address,
      perm_address,
      place,
      image: `${folderName}/${fileName}`,
    };

    if (!studentData.fname || !studentData.lname) {
      return res.status(400).json({ message: "First and last names are required" });
    }

    const newUser = new StudentModel(studentData);
    await newUser.validate();
    await newUser.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
