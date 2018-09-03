const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
//create schema
const userSchema = new Schema({
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true }
});

userSchema.pre("save", async function(next) {
  try {
    //gen salt
    const salt = await bcrypt.genSalt(10);

    //encrypt(hashed value is salt + hash)
    const hashedPassword = await bcrypt.hash(this.password, salt);

    //re assign the password
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

//create model
const user = mongoose.model("user", userSchema);

//export model
module.exports = user;
