const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("./configuration");
const User = require("./models/users");

//JSON web tokens strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        //find user
        const user = await User.findById(payload.sub);

        // if not found handle it
        if (!user) {
          return done(null, false);
        }

        //if found send it it

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

//Local strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        //chek for user
        const user = await User.findOne({ email });

        //if not found handle it
        if (!user) {
          return done(null, false);
        }

        //check password if correct
        const isMatch = await user.isValidPassword(password);

        //if not handle it
        if (!isMatch) {
          return done(null, false);
        }

        //otherwise return user
        done(null, user);
      } catch (err) {
          done(err)
      }
    }
  )
);
