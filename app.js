var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const mongoose = require("mongoose");
const MongodDB =
  "mongodb+srv://hripple46:yeMbKUK1FDUCHDtk@cluster0.mncxuxu.mongodb.net/?retryWrites=true&w=majority";

const main = async () => {
  await mongoose.connect(MongodDB);
};
main().catch((err) => console.log(err));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
