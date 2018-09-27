const express = require("express");
var cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const url = "mongodb://ds151382.mlab.com:51382/apiauthentication";
const opt = {
  useNewUrlParser: true,
  auth: {
    user: "prateekjena7733",
    password: "home@123"
  }
};

mongoose.connect(url,opt);

const app = express();

//middleware
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

//routes
app.use("/", require("./routes/home"));
app.use("/users", require("./routes/users"));

//starting server

const port = process.env.port || 7000 ;
app.listen(port, () => console.log(`server is on at ${port}`));
