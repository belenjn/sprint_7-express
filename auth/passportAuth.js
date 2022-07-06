const username = req.body.username;
const password = req.body.password;

var JwtStrategy = require("passport-jwt").Strategy;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    if (username === "belen" && password === "1234") {
      return done(null, { username });
    } else {
      return done({}, false);
    }
  })
);
