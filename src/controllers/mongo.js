import mongoose from "mongoose";
mongoose
  .connect("mongodb://localhost/hotel", {})
  .then((_) => console.log("Connection"))
  .catch((_) => console.log("ERROR" + _));
