import { Worker } from "../models/index.js";
import jwt from "jsonwebtoken";
import sha256 from "sha256";
import "./mongo.js";

// +
const GET = async (req, res) => {
  try {
    let worker;
    const { token } = req.headers;
    const { passportinfo, contact, gender } = req.body;
    if (!token && !passportinfo && !contact && !gender)
      worker = await Worker.find({ end: null });
    else if (passportinfo || gender)
      worker = await Worker.findOne({
        $or: [{ passport_info: sha256(passportinfo) }, { gender }],
        end: null,
      });
    else {
      const { _id } = token ? jwt.verify(token, "WORKER") : { _id: null };
      worker = await Worker.findOne({
        $or: [{ _id }, { contact }],
        end: null,
      });
      if (!worker) throw new Error("worker not work ago");
    }
    res.json({
      status: 200,
      message: "Old worker!",
      data:
        token || passportinfo || contact
          ? [worker, jwt.sign({ _id: worker._id }, "WORKER")]
          : worker,
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
      data: jwt.sign({ _id: worker._id }, "WORKER"),
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
    const { token, passportinfo, contact } = req.headers;
    const { _id } = token ? jwt.verify(token, "WORKER") : { _id: null };
    worker = await Worker.findOne({
      $or: [{ _id }, { passport_info: sha256(passportinfo) }],
      end: null,
    });
    if (contact && !token && !passportinfo)
      worker = await Worker.findOne({
        contact,
        end: null,
      });

    if (!worker) throw new Error("worker not work ago");

    let { firstName, lastName, gender, birthDate, passportInfo, workName } =
      req.body;
    const fworker = await Worker.updateOne(
      { _id: worker._id },
      {
        $set: {
          first_name: firstName ? firstName : worker.first_name,
          last_name: lastName ? lastName : worker.last_name,
          gender: gender ? gender : worker.gender,
          birth_day: birthDate ? birthDate : worker.birth_day,
          passport_info: passportInfo
            ? sha256(passportInfo)
            : worker.passport_info,
          work_name: workName ? workName : worker.work_name,
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

const PUTR = async (req, res) => {
  try {
    let worker;
    const { token } = req.headers;
    const { _id } = token ? jwt.verify(token, "WORKER") : { _id: null };
    const { passportinfo, contact, gender } = req.body;
    if (!token && !passportinfo && !contact && !gender)
      worker = await Worker.find({ end: { $ne: null } });
    else if (passportinfo || gender)
      worker = await Worker.findOne({
        $or: [{ passport_info: sha256(passportinfo) }, { gender }],
        end: null,
      });
    else {
      worker = await Worker.findOne({
        $or: [{ _id }, { contact }],
      });
      if (!worker) throw new Error("worker not work ago");
    }
    const worke = await Worker.updateOne(
      { _id },
      {
        $set: { end: null, begin: new Date(Date.now()) },
      }
    );
    if (!worke) throw new Error("worker already deleted");
    res.json({
      status: 200,
      message: "Restore worker!",
      data: [worke, jwt.sign({ _id: worker._id }, "WORKER")],
    });
  } catch (e) {
    res.json({
      status: 401,
      message: e.message,
    });
  }
};

// +
const DELETE = async (req, res) => {
  try {
    const { token, passportinfo, contact } = req.headers;

    const { _id } = token ? jwt.verify(token, "WORKER") : { _id: null };
    let worker = await Worker.findOne({
      $or: [{ _id }, { contact }],
      end: null,
    });
    if (!contact && !token && passportinfo)
      worker = await Worker.findOne({
        passport_info: sha256(passportinfo),
        end: null,
      });

    if (!worker) throw new Error("worker not found");
    const worke = await Worker.updateOne(
      { _id: worker._id },
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
  PUTR,
  DELETE,
};
