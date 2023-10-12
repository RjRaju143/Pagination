const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    dob: {
      type: String,
    },
    year: {
      type: Number,
      required: true,
    },
    present_address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    perm_address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    place: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Students", userSchema);
