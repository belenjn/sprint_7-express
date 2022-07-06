const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const user = {
  userName: "belen@hotel.com",
  pass: "1234",
};

const {passportKey} = require("../env")

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
    },
    async (userName, password, done) => {
      try {
        console.log(userName, password, user);
        if (userName === user.userName && password === user.pass) {
          return done(null, user, { message: "Logged in Successfully" });
        }
        return done(null, false, {
          message: "User not found or Wrong Password",
        });
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: passportKey,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
