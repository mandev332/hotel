import mongoose from "mongoose";
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  passport_info: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: Number,
    default: 1,
  },
  room_number: {
    type: Number,
    required: true,
  },
  room_type: {
    type: Number,
    default: 1,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  come_date: {
    type: Date,
    default: new Date(Date.now()),
  },
  left_date: {
    type: Date,
  },
});
const Customermodel = mongoose.model("customers", CustomerSchema);
export default Customermodel;
