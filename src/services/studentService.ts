import path from "path";
import validator from "validator";
import StudentModel from "../models/student";
import { UploadedFile } from "express-fileupload";
export const registerStudent = async (
  photoFile: UploadedFile,
  email: string,
  mobile: string,
  fname: string,
  lname: string,
  dob: string,
  year: string,
  present_address: string,
  perm_address: string,
  place: string
) => {
  try {
    const fileName = new Date().getTime() + path.extname(photoFile.name);
    const folderName = "images";
    const savePath = path.join(__dirname, "../..", folderName, fileName);
    await photoFile.mv(savePath);
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      throw new Error("Invalid mobile number");
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
      throw new Error("First and last names are required");
    }
    const newUser = new StudentModel(studentData);
    await newUser.validate();
    await newUser.save();
    return { success: true, message: "Student registered successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};
