const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { isEmail } = require("validator");
const bycrpt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "please Set a user name"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "please enter a password"],
      minlength: [6, "password can't be less than 6 charachters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequestsSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequestsReceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bycrpt.genSalt();
  this.password = await bycrpt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (reqEmail, reqPassword) {
  try {
    let userData = await this.findOne({ email: reqEmail });
    if (userData) {
      const passwordMatch = await bycrpt.compare(
        reqPassword,
        userData.password
      );
      if (passwordMatch) {
        return userData;
      } else {
        throw Error("invalid email or password");
      }
    } else {
      throw Error("User Not found");
    }
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
