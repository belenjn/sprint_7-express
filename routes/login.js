var express = require("express");
var router = express.Router();

let login = require("../controllers/loginController");

const username = req.body.username;
const password = req.body.password;

var JwtStrategy = require("passport-jwt").Strategy;

router.post(
  "/",
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      // jwt_payload is an object literal containing the decoded JWT payload.
      //done is a passport error first callback accepting arguments done(error, user, info)

      if (username === "belen" && password === "1234") {
        return done(null, { username });
      } else {
        return done({}, false);
      }
    })
  )
);

module.exports = router;
