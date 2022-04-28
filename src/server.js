import express from "express";
import cors from "cors";
import Check from "./check/check.js";
import Customer from "./routers/customer.js";
import Room from "./routers/room.js";
import Worker from "./routers/worker.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors("http://localhost:4000"));
app.use(express.json());

app.get("/login", Check.login);

app.use("/customers", Customer);
app.use("/workers", Worker);
app.use("/rooms", Room);

app.listen(PORT, () =>
  console.log("Server is running on http://localhost:" + PORT)
);
