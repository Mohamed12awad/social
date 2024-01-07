const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { sendWelcomeEmail } = require("./emailService");
const { jwtSecret } = require("../config");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  return jwt.sign({ userId: id }, jwtSecret, {
    expiresIn: "1h",
  });
};

const handleError = (err) => {
  console.log(err.message, err.code);
  let errors = {};

  // duplicate email
  if (err.code === 11000) {
    err.keyPattern.email ? (errors.email = "Email already exists.") : "";
    err.keyPattern.username ? (errors.username = "Username  exists.") : "";

    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

exports.get_users = async (req, res) => {
  try {
    const users = await User.find({}).limit(10);
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Finding users", error: err.message });
  }
};

exports.get_singleUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId)
      .populate("friends", "username")
      .populate("friendRequestsReceived", "username")
      .populate("friendRequestsSent", "username");
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Finding users", error: err.message });
  }
};

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password,
      isVerified: false,
    });

    const token = createToken(newUser._id);
    sendWelcomeEmail(newUser.email, newUser.username, token);

    res
      .status(200)
      .json({ message: "Signup successful. Please verify your email." });
  } catch (err) {
    let errMsg = handleError(err);
    // console.log(err);
    res.status(400).json({ errMsg });
  }
};
exports.signUpVerify = async (req, res) => {
  const userId = req.params.id;
  try {
    // console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "no user with such id" });
    }
    const token = createToken(user._id);
    sendWelcomeEmail(user.email, user.username, token);

    res.status(200).json({ message: "Email sent. Please verify your email." });
  } catch (err) {
    let errMsg = handleError(err);
    // console.log(err);
    res.status(400).json({ errMsg });
  }
};

exports.varify = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, jwtSecret);

    const userId = decoded.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying email", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email: reqEmail, password: reqPassword } = req.body;
  try {
    const user = await User.login(reqEmail, reqPassword);

    if (user) {
      let token;
      try {
        token = createToken(user._id);
      } catch (err) {
        res.status(301).json({ message: "sign in agin" });
      }

      res.cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        path: "/",
        httpOnly: true,
      });

      res.status(200).json({
        message: "Login successful",
        redirect: "/",
        user: {
          token: token,
        },
      });
    }
  } catch (err) {
    res.status(501).json({ message: "err signing in" });
  }
};

exports.edit_user = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  // Check if the update includes a password change
  if (updateData.password) {
    const salt = await bcrypt.genSalt();
    updateData.password = await bcrypt.hash(updateData.password, salt);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "edit successful", user: updatedUser });
  } catch (err) {
    console.log(err);
  }
};

exports.delete_user = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndDelete(id);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

exports.logOut = async (req, res) => {
  try {
    req.user = null;

    // res.clearCookie("token", { path: "/" });
    res.cookie("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });
    // console.log(res.cookie);
    // res.setHeader("Clear-Site-Data", '"cookies"');

    jwt.sign("", jwtSecret);

    res.status(200).json({ message: "successful sign out" });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
