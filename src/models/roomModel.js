import mongoose from "mongoose";
const { Schema } = mongoose;

const RoomSchema = new Schema({
  room_number: {
    type: Number,
    required: true,
    unique: true,
  },
  room_type: {
    type: Number,
    required: true,
  },
  bed: {
    type: Number,
    required: true,
  },
  television: {
    type: Boolean,
  },
  conditioner: {
    type: Boolean,
  },
  other: {
    type: String,
  },
  price: {
    type: Number,
  },
  busy: {
    type: Boolean,
    default: false,
  },
});
const Roommodel = mongoose.model("rooms", RoomSchema);
export default Roommodel;
