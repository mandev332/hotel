import { Room } from "../models/index.js";

const GET = async (req, res) => {
  try {
    let rooms;
    let { roomNumber, busy, page, limit } = req.query;
    if (!roomNumber) rooms = await Room.find({ busy: +busy ? true : false });
    else {
      rooms = await Room.find({
        room_number: roomNumber,
        busy: +busy ? true : false,
      });
      if (!rooms) throw new Error("rooms not found");
    }
    res.json({
      status: 200,
      message: "Rooms!",
      pagin:
        rooms.length % limit
          ? parseInt(rooms.length / limit) + 1
          : rooms.length / limit,
      data: rooms.slice((page - 1) * limit, limit * page),
    });
  } catch (e) {
    res.json({
      status: 404,
      message: e.message,
    });
  }
};

const POST = async (req, res, next) => {
  try {
    let { roomNumber, roomType, bed, television, conditioner, other, price } =
      req.body;
    const room = await Room.create({
      room_number: roomNumber,
      room_type: roomType,
      bed,
      television: television ? true : false,
      conditioner: conditioner ? true : false,
      other,
      price,
    });

    res.json({
      status: 200,
      message: "Add Room!",
      data: room,
    });
    return next();
  } catch (e) {
    res.json({
      status: 404,
      message: e.message,
    });
  }
};

const PUT = async (req, res, next) => {
  try {
    const { roomNumber } = req.params;
    const room = await Room.findOne({
      room_number: roomNumber,
      busy: busy ? true : false,
    });
    if (!room) throw new Error("room not found");

    const { roomType, bed, television, conditioner, other, price } = req.body;
    const froom = await Room.updateOne(
      { room_number: roomNumber },
      {
        $set: {
          room_type: roomType ? roomType : room.room_type,
          bed: bed ? bed : room.bed,
          television: television ? television : room.television,
          conditioner: conditioner ? conditioner : room.conditioner,
          other: other ? other : room.other,
          price: price ? price : room.price,
        },
        $currentDate: { lastModified: true },
      }
    );

    res.json({
      status: 200,
      message: "Update room!",
    });
    return next();
  } catch (e) {
    res.json({
      status: 404,
      message: e.message,
    });
  }
};
const DELETE = async (req, res) => {
  try {
    const { _id } = req.params;
    const room = await Room.deleteOne({
      _id,
    });
    let k = await Room.findOne({ _id });
    console.log(k);
    res.json({
      status: 200,
      message: "Delete room!",
    });
  } catch (e) {
    res.json({
      status: 404,
      message: e.message,
    });
  }
};

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
