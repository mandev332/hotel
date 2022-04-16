import sha256 from "sha256";
import jwt from "jsonwebtoken";

const login = async (req, res, next) => {
  try {
    let { login, password } = req.body;
    if (
      login != "grand" ||
      sha256(password) !=
        "22e5b48f9290efb4c81270f9c0118e55141f8fdf33ab7f0869d1a0218feabbe8"
    )
      throw new Error(" login or password wrong ");
    res.json({
      status: 200,
      message: "welcome!",
      data: jwt.sign({ token: key }, "wherehouse"),
    });
    next();
  } catch (e) {
    res.json({
      status: 401,
      message: e.message,
    });
  }
};

const Worker = (req, res, next) => {
  let {
    firstName,
    lastName,
    gender,
    birthDate,
    passportinfo,
    workName,
    contact,
  } = args;
  if (
    !firstName &&
    !lastName &&
    !gender &&
    !birthDate &&
    !passportinfo &&
    !workName &&
    !contact
  )
    throw new Error("You must send me one your data");
  if (firstName && (firstName.length > 20 || firstName.length < 3))
    throw new Error("You send invalid firstname!");
  if (lastName && (lastName.length > 20 || lastName.length < 3))
    throw new Error("You send invalid lastname!");
  if (gender && ![1, 2].includes(gender))
    throw new Error("You send invalid gender!");
  if (
    birthDate &&
    !/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(birthDate)
  )
    throw new Error("You send invalid birthdate!");
  if (passportinfo && !/^[A-Z]{2} [0-9]{7}/.test(passportinfo))
    throw new Error("You send invalid passport info!");
  if (workName && (workName.length > 40 || workName.length < 2))
    throw new Error("You send invalid work name!");
  if (contact && !/^9[012345789][0-9]{7}$/.test(contact))
    throw new Error("You send invalid contact!");
  return next();
};

const Consumer = (req, res) => {
  let { firstName, lastName, gender, roomNumber, passportInfo, roomType } =
    req.body;
  if (
    !firstName &&
    !lastName &&
    !passportInfo &&
    !gender &&
    !roomNumber &&
    !roomType &&
    !contact
  )
    throw new Error("You must send me one your data");
  if (firstName && (firstName.length > 20 || firstName.length < 3))
    throw new Error("You send invalid firstname!");
  if (lastName && (lastName.length > 20 || lastName.length < 3))
    throw new Error("You send invalid lastname!");
  if (gender && ![1, 2].includes(gender))
    throw new Error("You send invalid gender!");
  if (roomNumber && ![1, 2].includes(roomNumber))
    throw new Error("You send invalid room number!");
  if (passportInfo && !/[A-Z]{2} [0-9]{7}/.test(passportInfo))
    throw new Error("You send invalid passport info!");
  if (roomType && (roomType > 5 || roomType < 1))
    throw new Error("You send invalid room type!");
  if (contact && !/^9[012345789][0-9]{7}$/.test(contact))
    throw new Error("You send invalid contact!");
  return next();
};

const Room = (req, res, next) => {
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
};

export default {
  login,
  Worker,
  Consumer,
  Room,
};
