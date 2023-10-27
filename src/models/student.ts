import mongoose, { Schema, Document } from "mongoose";
interface IStudent extends Document {
  fname: string;
  lname: string;
  email: string;
  mobile: number;
  dob?: string;
  year: number;
  present_address: string;
  perm_address: string;
  place?: string;
  image?: string;
}
const studentSchema: Schema = new Schema<IStudent>(
  { fname: { type: String, required: true, trim: true, minlength: 2, maxlength: 50, }, lname: { type: String, required: true, trim: true, minlength: 2, maxlength: 50, }, email: { type: String, required: true, trim: true, lowercase: true, }, mobile: { type: Number, required: true, }, dob: { type: String, }, year: { type: Number, required: true, }, present_address: { type: String, required: true, minlength: 5, maxlength: 100, }, perm_address: { type: String, required: true, minlength: 5, maxlength: 100, }, place: { type: String, }, image: { type: String, }, }, { timestamps: true, }
);
const StudentModel = mongoose.model<IStudent>("Students", studentSchema);
export default StudentModel;
