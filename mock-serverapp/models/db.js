const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const url = "mongodb://localhost:27017/mock-master";

mongoose.connect(url);

const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("connected to DB");
});
conn.on("disconnected", () => {
  console.log("Disconnected to DB");
});
conn.on("error", () => {
  console.log("could not connected to DB");
});
