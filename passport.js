const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
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

//GOOOGLE O Auth startegy

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "101989121646-c334vke0p6dcs6fvp4tsk633iev30sgj.apps.googleusercontent.com",
      clientSecret: "ICZr2fVpv9lOpOuJcvShk3gt"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(accessToken),
        // console.log("profile",profile)

        //checking the user is available in our DB
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          console.log("user already exists in our DB");
          return done(null, existingUser);
        }
        console.log("creating new user");
        //if new user
        const newUser = new User({
          account: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });
        await newUser.save();
        done(null, newUser);
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
        const user = await User.findOne({ "local.email": email });

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
        done(err, false);
      }
    }
  )
);
