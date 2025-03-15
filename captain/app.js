const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/captain.routes");
const cookieParser = require("cookie-parser");
const connect = require("./db/db");
connect();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRoutes);

module.exports = app;
