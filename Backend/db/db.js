const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("MongoDB connected successfully")
    })
    .catch((err)=>{
        console.log("MongoDB connection failed", err.message)
    })
}

module.exports = connectDB;