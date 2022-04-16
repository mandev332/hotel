import { Consumer } from "../models/index.js";
import jwt from "jsonwebtoken";

const GET = async (req, res) => {
  try {
    let consumer;
    const { token } = req.headers;
    const { passportInfo } = req.headers;

    if (!token && !passportInfo && !contact) consumer = await Consumer.find();
    else {
      const { _id } = token ? jwt.verify(token, "CONSUMER") : { _id: null };
      consumer = await Consumer.findOne({
        $or: [{ _id }, { passport_info: passportInfo }, { contact }],
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
      data: jwt.sign({ token: consumer._id }, "CONSUMER"),
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
    const { _id } = jwt.verify(req.headers.token, "CONSUMER");
    const consumer = await Consumer.findOne({ _id });
    if (!consumer) throw new Error("Consumer is not found");
    let { firstName, lastName, gender, roomNumber, passportInfo, roomType } =
      req.body;
    const fconsumer = await Consumer.updateOne(
      { _id },
      {
        $set: {
          first_name: firstName ? firstName : fconsumer.first_name,
          last_name: lastName ? lastName : fconsumer.last_name,
          gender: gender ? gender : fconsumer.gender,
          room_number: roomNumber ? roomNumber : fconsumer.room_number,
          passport_info: passportInfo ? passportInfo : fconsumer.passport_info,
          room_type: roomType ? roomType : fconsumer.room_type,
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
    const { token, passportinfo, contact } = req.headers;
    const { _id } = token ? jwt.verify(token, "CONSUMER") : { _id: null };
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
      data: token ? consumere : jwt.sign({ token: consumer._id }, "CONSUMER"),
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
    const { _id } = jwt.verify(req.headers.token, "CONSUMER");
    const consumer = await Consumer.findOne({ _id });
    if (!consumer) throw new Error("Consumer is not found");
    const worke = await Consumer.updateOne(
      { _id, left_date: null },
      { $set: { left_date: new Date(Date.now()) } }
    );
    if (!worke) throw new Error("Consumer already lefted");
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
