var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("./auth/passportAuth");
require("./db");

const passport = require("passport");

var app = express();
mongoose.set("useFindAndModify", false);

let bookingsRoute = require("./routes/bookings");
let contactsRoute = require("./routes/contacts");
let roomsRoute = require("./routes/rooms");
let usersRoute = require("./routes/users");
let loginRoute = require("./routes/login");
const { host } = require("./env");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", host);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.end();
  } else {
    next();
  }
});
app.use(
  bodyParser.urlencoded({
    limit: "20mb",
    extended: true,
  })
);
app.use(
  bodyParser.json({
    limit: "20mb",
  })
);

app.use("/login", loginRoute);
app.use(
  "/bookings",
  passport.authenticate("jwt", { session: false }),
  bookingsRoute
);

app.use(
  "/contacts",
  passport.authenticate("jwt", { session: false }),
  contactsRoute
);
app.use("/rooms", passport.authenticate("jwt", { session: false }), roomsRoute);
app.use("/publicRooms", roomsRoute);
app.use("/users", passport.authenticate("jwt", { session: false }), usersRoute);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ success: false, message: "Error: " + err.status });
});

module.exports = app;
