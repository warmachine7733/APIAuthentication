const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const url = "mongodb://localhost/APIAuthentication";
const opt = { useNewUrlParser: true };
mongoose.connect(url,opt)

const app = express();

//middleware
app.use(logger("dev"));
app.use(bodyParser.json());

//routes
app.use("/users", require("./routes/users"));

//starting server

const port = 7000;
app.listen(port, () => console.log(`server is on at ${port}`));
