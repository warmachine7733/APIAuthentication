const JWT = require("jsonwebtoken");

const User = require("../models/users");
const { JWT_SECRET } = require("../configuration");

signToken = user => {
  return JWT.sign(
    {
      iss: "apiAuth",
      sub: user.id,
      iat: new Date().getTime(), //current date
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  );
};

module.exports = {
  signup: async (req, res, next) => {
    const { email, password } = req.value.body;

    //checking user with same email id already exists
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) return res.status(403).json("email id exists");

    //creating user
    const newUser = new User({
      account: "local",
      local: { email, password }
    });
    await newUser.save();

    //create and send token
    const token = signToken(newUser);

    res.status(200).json({ token });
  },
  googleOAuth: async (req, res, next) => {
    // console.log("req.user", req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  signin: async (req, res, next) => {
    //gen Token
    const token = await signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    res.status(200).json({ resource: "success" });
  }
};
