const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller")

router.post("/login",[
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long.")
],userController.loginUser);

router.post("/register",[
    body("username").notEmpty().withMessage("Username is required."),
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long.")
],userController.registerUser);

module.exports = router;