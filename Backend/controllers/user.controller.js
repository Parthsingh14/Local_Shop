const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const userService = require("../services/user.service")

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.username,
      email: user.email,
      token: token,
    },
  });
};

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    username: username,
    email,
    password: hashedPassword,
  })
  const token = await user.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.username,
      email: user.email,
    },
  });
};
