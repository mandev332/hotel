import mongoose from "mongoose";
const { Schema } = mongoose;

const ConsumerSchema = new Schema({
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
    unique: true,
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
    default: null,
  },
});
const Consumermodel = mongoose.model("consumers", ConsumerSchema);
export default Consumermodel;
