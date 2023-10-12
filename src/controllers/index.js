const path = require("path");
const validator = require('validator');
const StudentModel = require("../models/student");

exports.studentDetailsRegister = async (req, res) => {
  try {

    if (!req.files || !req.files.photo) {
      return res.status(400).json({ error: "Image not found" });
    }

    const file = req.files.photo;
    const fileName = new Date().getTime().toString() + path.extname(file.name);
    const folderName = "images";
    const savePath = path.join(__dirname, "../..", folderName, fileName);
    await file.mv(savePath);

    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(req.body.mobile)) {
      return res.status(400).json({ error: "Invalid mobile number" });
    }

    const studentData = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      mobile: req.body.mobile,
      dob: req.body.dob,
      year: req.body.year,
      present_address: req.body.present_address,
      perm_address: req.body.perm_address,
      place: req.body.place,
      image: `${folderName}/${fileName}`,
    };

    if (!studentData.fname) {
      return res.status(400).json({ message: "First name is required" });
    }

    if (!studentData.lname) {
      return res.status(400).json({ message: "Last name is required" });
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


