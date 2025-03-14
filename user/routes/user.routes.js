const express = require("express");
const route = express.Router();
const userController = require("../controller/user.controller");
const authMiddleWare = require("../middleware/authMiddleWare");

route.post("/register", userController.register);
route.post("/login", userController.login);
route.get("/logout", userController.logout);
route.get("/porfile", authMiddleWare, userController.porfile
);

module.exports = route;
