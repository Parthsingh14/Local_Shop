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

  const { username, email, password, role = 'customer' } = req.body; // Default to 'customer' if not provided
  
  try {
    // Check if user exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and create user
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      username,
      email,
      password: hashedPassword,
      role // Include the role
    });

    // Generate token
    const token = await user.generateAuthToken();
    
    // Set cookie and send response
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role // Include role in response
      },
    });

  } catch (error) {
    next(error);
  }
};

module.exports.getUsersByRole = async (req, res) => {
    try {
        const { role } = req.query;
        
        // Build query object
        const query = {};
        if (role) {
            query.role = role;
        }

        // Find users with optional role filter
        const users = await User.find(query).select('-password'); // Exclude passwords
        
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};