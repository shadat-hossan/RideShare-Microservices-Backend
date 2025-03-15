const express = require("express");
const route = express.Router();
const captainController = require("../controller/captain.controller");
const authMiddleWare = require("../middleware/authMiddleWare");

route.post("/register", captainController.register);
route.post("/login", captainController.login);
route.get("/logout", captainController.logout);
route.get("/porfile", authMiddleWare, captainController.porfile);
route.patch(
  "/toggle-availablity",
  authMiddleWare,
  captainController.toggleAvailability
);

module.exports = route;
