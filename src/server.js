import express from "express";
import Check from "./check/check.js";
import Consumer from "./routers/consumer.js";
import Room from "./routers/room.js";
import Worker from "./routers/worker.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.get("/login", Check.login);

app.use("/consumers", Consumer);
app.use("/workers", Worker);
app.use("/rooms", Room);

app.listen(PORT, () =>
  console.log("Server is running on http://localhost:" + PORT)
);
