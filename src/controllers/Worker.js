import { Worker } from "../models/index.js";
import sha256 from "sha256";
import "./mongo.js";

// +
const GET = async (req, res) => {
  try {
    let worker;
    const { _id } = req.params;
    let { passportinfo, contact, name, end } = req.query;
    if (_id)
      worker = await Worker.findOne({ _id, end: +end ? null : { $ne: null } });
    else if (!passportinfo && !contact && !name)
      worker = await Worker.find({ end: +end ? null : { $ne: null } });
    else if (passportinfo)
      worker = await Worker.findOne({
        passport_info: sha256(passportinfo),
        end: end ? null : { $ne: null },
      });
    else if (name)
      worker = await Worker.find({
        $or: [{ first_name: name }, { last_name: name }],
        end: +end ? null : { $ne: null },
      });
    else {
      worker = await Worker.findOne({
        contact,
        end: +end ? null : { $ne: null },
      });
      if (!worker) throw new Error("worker not work ago");
    }
    res.json({
      status: 200,
      message: "Old worker!",
      data: worker,
    });
  } catch (e) {
    res.json({
      status: 401,
      message: e.message,
    });
  }
};

// +
const POST = async (req, res, next) => {
  try {
    let {
      firstName,
      lastName,
      gender,
      birthDate,
      passportinfo,
      workName,
      contact,
    } = req.body;
    const worker = await Worker.create({
      first_name: firstName,
      last_name: lastName,
      gender,
      birth_day: birthDate,
      passport_info: sha256(passportinfo),
      work_name: workName,
      contact,
    });

    res.json({
      status: 200,
      message: "Add Worker!",
      data: worker,
    });
    return next();
  } catch (e) {
    res.json({
      status: 400,
      message: e.message,
    });
  }
};

// +
const PUT = async (req, res, next) => {
  try {
    let worker;
    const { _id } = req.params;
    worker = await Worker.findOne({
      _id,
    });
    if (!worker) throw new Error("worker not work ago");

    let {
      firstName,
      lastName,
      gender,
      birthDate,
      passportinfo,
      workName,
      begin,
      end,
    } = req.body;
    const fworker = await Worker.updateOne(
      { _id },
      {
        $set: {
          first_name: firstName ? firstName : worker.first_name,
          last_name: lastName ? lastName : worker.last_name,
          gender: gender ? gender : worker.gender,
          birth_day: birthDate ? birthDate : worker.birth_day,
          passport_info: passportinfo
            ? sha256(passportinfo)
            : worker.passport_info,
          work_name: workName ? workName : worker.work_name,
          begin: begin ? new Date(begin) : worker.begin,
          end: end ? null : worker.end,
        },
        $currentDate: { lastModified: true },
      }
    );

    res.json({
      status: 200,
      message: "Update Worker!",
    });
    return next();
  } catch (e) {
    res.json({
      status: 404,
      message: e.message,
    });
  }
};

// +
const DELETE = async (req, res) => {
  try {
    const { _id } = req.params;
    let worker = await Worker.findOne({
      _id,
      end: null,
    });
    if (!worker) throw new Error("worker not found");
    const worke = await Worker.updateOne(
      { _id },
      {
        $set: { end: new Date(Date.now()) },
        $currentDate: { lastModified: true },
      }
    );

    res.json({
      status: 200,
      message: "Delete worker!",
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
