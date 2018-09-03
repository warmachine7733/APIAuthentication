const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
//create schema
const userSchema = new Schema({
  account: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});

userSchema.pre("save", async function(next) {
  if (this.account != "local") {
    next();
  }

  try {
    //gen salt
    const salt = await bcrypt.genSalt(10);

    //encrypt(hashed value is salt + hash)
    const hashedPassword = await bcrypt.hash(this.local.password, salt);

    //re assign the password
    this.local.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (err) {
    throw new Error(err);
  }
};

//create model
const user = mongoose.model("user", userSchema);

//export model
module.exports = user;
