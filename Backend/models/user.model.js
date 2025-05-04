const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
  });



  userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    }); //it makes sure that which data will be stored in the token.
  };
  
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
  };
  
  module.exports = mongoose.model("user", userSchema);