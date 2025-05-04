const dotenv = require('dotenv')
const cors = require('cors');
const express = require('express');
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");

const userRoutes = require("./routes/user.routes");


const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

app.use("/users", userRoutes);  

module.exports = app;
