const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

require("./models/db");

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-accessToken,x-refreshToken");
  next();
});

app.use(bodyParser.json());

const port = 8080;

console.log("Request Recived...");

app.use("/api/Login", require("./routes/login.route"));
app.use("/api/questions", require("./routes/question.route"));
app.use("/api/contact", require("./routes/contactUs.route"));
app.use("/api/signUp", require("./routes/signUp.route"));
app.use("/api/user1", require("./routes/user1.route"));
app.use("/api/students", require("./routes/student.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/tests", require("./routes/test.route"));
app.listen(port, console.log(`Server is listning on port no ${port}`));
