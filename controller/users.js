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
    const foundUser = await User.findOne({ email });
    if (foundUser) return res.status(403).json("email id exists");

    //creating user
    const newUser = new User({ email, password });
    await newUser.save();

    //send token
    const token = signToken(newUser);

    res.status(200).json({ token });
  },

  signin: async (req, res, next) => {
    console.log("userController.signin() is called");
  },

  secret: async (req, res, next) => {
    console.log("userController.secret() is called");
  }
};