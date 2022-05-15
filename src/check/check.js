import sha256 from "sha256";
import jwt from "jsonwebtoken";

// hotel777
const login = async (req, res, next) => {
  try {
    const { token } = req.headers;
    let { login, password } = req.query;
    if (token) {
      login = jwt.verify(token, "hotel");
      return res.json({
        status: 200,
        message: "welcome!",
      });
    }

    if (
      login != "grand" ||
      sha256(password) !=
        "7d44f32745a41003c76d478bc56b3a25b98d764dc01d61f395d66681daf142d0"
    )
      throw new Error("login or password wrong ");
    res.json({
      status: 200,
      message: "welcome!",
      data: jwt.sign({ token: login }, "hotel"),
    });
    next();
  } catch (e) {
    res.json({
      status: 401,
      message: e.message,
    });
  }
};

function testbody(arg) {
  let { firstName, lastName, gender, passportinfo, contact } = arg;
  if (!firstName && !lastName && !passportinfo && !gender && !contact)
    throw new Error("You must send me one your data");
  if (firstName && (firstName.length > 20 || firstName.length < 3))
    throw new Error("You send invalid firstname!");
  if (lastName && (lastName.length > 20 || lastName.length < 3))
    throw new Error("You send invalid lastname!");
  if (gender && ![1, 2].includes(gender))
    throw new Error("You send invalid gender!");
  if (passportinfo && !/^[A-Z]{2} [0-9]{7}/.test(passportinfo))
    throw new Error("You send invalid passport info!");
  if (contact && !/^9[012345789][0-9]{7}$/.test(contact))
    throw new Error("You send invalid contact!");
  return true;
}

const Worker = (req, res, next) => {
  try {
    let { birthDate, workName } = req.body;
    testbody(req.body);
    if (
      birthDate &&
      !/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(birthDate)
    )
      throw new Error("You send invalid birthdate!");
    if (workName && (workName.length > 40 || workName.length < 2))
      throw new Error("You send invalid work name!");
    next();
  } catch (er) {
    return res.json({
      status: 400,
      message: er.message,
    });
  }
};

const Customer = (req, res, next) => {
  try {
    let { roomNumber } = req.body;
    testbody(req.body);
    if (!1 > roomNumber) throw new Error("You send invalid room number!");
    return next();
  } catch (er) {
    return res.json({
      status: 400,
      message: er.message,
    });
  }
};

const Room = (req, res, next) => {
  try {
    let { roomNumber, roomType, bed, television, conditioner, other, price } =
      req.body;
    if (
      !roomNumber &&
      !roomType &&
      !bed &&
      !television &&
      !conditioner &&
      !other &&
      !price
    )
      throw new Error("You must send me one datas about room");
    if (roomNumber && (roomNumber > 500 || roomNumber < 1))
      throw new Error("You send invalid room number!");
    if (roomType && (roomType > 500 || roomType < 1))
      throw new Error("You send invalid room type!");
    if (bed && (bed > 4 || bed < 1)) throw new Error("You send invalid bed!");
    if (other && other.length > 50) throw new Error("You send invalid other!");
    return next();
  } catch (er) {
    return res.json({
      status: 400,
      message: er.message,
    });
  }
};

export default {
  login,
  Worker,
  Customer,
  Room,
};
