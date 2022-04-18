import { Consumer } from "../models/index.js";

const GET = async (req, res) => {
  try {
    let consumer;
    const { _id } = req.params;
    const { passportInfo, contact, left } = req.query;
    if (!_id && !passportInfo && !contact) {
      consumer = await Consumer.find({
        left_date: left ? { $ne: null } : null,
      });
    } else {
      consumer = await Consumer.findOne({
        $or: [{ _id }, { passport_info: passportInfo }, { contact }],
        end: null,
      });
      if (!consumer) throw new Error("Consumer is not come ago");
    }
    res.json({
      status: 200,
      message: "Consumer!",
      data: consumer,
    });
  } catch (e) {
    res.json({
      status: 401,
      message: e.message,
    });
  }
};

const POST = async (req, res, next) => {
  try {
    let {
      firstName,
      lastName,
      passportInfo,
      gender,
      roomNumber,
      roomType,
      contact,
    } = req.body;
    const consumer = await Consumer.create({
      first_name: firstName,
      last_name: lastName,
      gender,
      room_number: roomNumber,
      passport_info: passportInfo,
      room_type: roomType,
      contact,
    });

    res.json({
      status: 200,
      message: "Add Consumer!",
      data: consumer,
    });
  } catch (e) {
    res.json({
      status: 404,
      message: e.message,
    });
  }
};

const PUT = async (req, res, next) => {
  try {
    let consumer;
    const { _id } = req.params;
    if (!_id) {
      consumer = await Consumer.findOne({ _id });
      if (!consumer) throw new Error("Consumer is not found");
    }
    let { firstName, lastName, gender, roomNumber, passportInfo, roomType } =
      req.body;
    const fconsumer = await Consumer.updateOne(
      { _id },
      {
        $set: {
          first_name: firstName ? firstName : consumer.first_name,
          last_name: lastName ? lastName : consumer.last_name,
          gender: gender ? gender : consumer.gender,
          room_number: roomNumber ? roomNumber : consumer.room_number,
          passport_info: passportInfo ? passportInfo : consumer.passport_info,
          room_type: roomType ? roomType : consumer.room_type,
        },
        $currentDate: { lastModified: true },
      }
    );

    res.json({
      status: 200,
      message: "Update Consumer!",
    });
    return next();
  } catch (e) {
    res.json({
      status: 404,
      message: e.message,
    });
  }
};

const PUTR = async (req, res) => {
  try {
    const { _id } = req.params;
    const { passportinfo, contact } = req.query;
    const consumer = await Consumer.findOne({
      $or: [{ _id }, { passport_info: passportinfo }, { contact }],
    });
    if (!consumer) throw new Error("Consumer is not come ago");
    const consumere = await Consumer.updateOne(
      { _id },
      { $set: { come_date: new Date(Date.now()) } }
    );
    if (!consumere) throw new Error("Consumer already lefted");
    res.json({
      status: 200,
      message: "Restore Consumer!",
      data: _id ? consumere : consumer._id,
    });
  } catch (e) {
    res.json({
      status: 401,
      message: e.message,
    });
  }
};

const DELETE = async (req, res) => {
  try {
    const { _id } = req.params;
    const consumer = await Consumer.findOne({ _id, left_date: null });
    if (!consumer) throw new Error("Consumer is not found");
    const worke = await Consumer.updateOne(
      { _id },
      { $set: { left_date: new Date(Date.now()) } }
    );
    res.json({
      status: 200,
      message: "Left consumer!",
    });
  } catch (e) {
    res.json({
      status: 401,
      message: e.message,
    });
  }
};

export default {
  GET,
  POST,
  PUT,
  PUTR,
  DELETE,
};
