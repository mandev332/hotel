import mongoose from "mongoose";
const { Schema } = mongoose;

const WorkerSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  birth_day: {
    type: Date,
    required: true,
  },
  passport_info: {
    type: String,
    required: true,
    unique: true,
  },
  work_name: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    default: 1,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  begin: {
    type: Date,
    default: new Date(Date.now()),
  },
  end: {
    type: Date,
    default: null,
  },
});
const Workermodel = mongoose.model("workers", WorkerSchema);
export default Workermodel;
