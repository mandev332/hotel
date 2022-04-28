import { Customer } from "../models/index.js";
import sha256 from "sha256";

const GET = async (req, res) => {
  try {
    let customer;
    const { _id } = req.params;
    const { name, passportInfo, contact, left } = req.query;
    if (!_id && !passportInfo && !contact && !name) {
      customer = await Customer.find({
        left_date: +left ? null : { $ne: null },
      });
    } else {
      customer = await Customer.find({
        $or: [
          { _id },
          { first_name: name },
          { last_name: name },
          { passport_info: passportInfo },
          { contact },
        ],
        left_date: +left ? null : { $ne: null },
      });
      if (!customer) throw new Error("Customer is not come ago");
    }
    res.json({
      status: 200,
      message: "Customer!",
      data: customer,
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
      contact,
      leftDate,
    } = req.body;
    const customer = await Customer.create({
      first_name: firstName,
      last_name: lastName,
      gender,
      room_number: roomNumber,
      passport_info: passportInfo,
      contact,
      left_date: leftDate ? new Date(leftDate) : null,
    });

    res.json({
      status: 200,
      message: "Add Customer!",
      data: customer,
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
    let customer;
    const { _id } = req.params;
    if (_id) {
      customer = await Customer.findOne({ _id });
      if (!customer) throw new Error("Customer is not found");
    } else throw new Error("You must input id for update!");
    let {
      firstName,
      lastName,
      gender,
      roomNumber,
      passportInfo,
      comeDate,
      leftDate,
    } = req.body;
    const fcustomer = await Customer.findByIdAndUpdate(
      _id,
      {
        $set: {
          first_name: firstName ? firstName : customer.first_name,
          last_name: lastName ? lastName : customer.last_name,
          gender: gender ? gender : customer.gender,
          room_number: roomNumber ? roomNumber : customer.room_number,
          passport_info: passportInfo
            ? sha256(passportInfo)
            : customer.passport_info,
          come_date: comeDate ? new Date(comeDate) : customer.come_date,
          left_date: leftDate ? new Date(leftDate) : customer.left_date,
        },
        $currentDate: { lastModified: true },
      },
      { new: true }
    );
    res.json({
      status: 200,
      message: "Update Customer!",
      data: fcustomer,
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
    const customer = await Customer.findOne({ _id, left_date: null });
    if (!customer) throw new Error("Customer is not found");
    const worke = await Customer.findByIdAndUpdate(
      _id,
      { $set: { left_date: new Date(Date.now()) } },
      { new: true }
    );
    res.json({
      status: 200,
      message: "Left customer!",
      data: worke,
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
  DELETE,
};
