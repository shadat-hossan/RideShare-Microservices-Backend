const route = require("express").Router();
const authMiddleware = require("../middleware/auth.middlewate");
const rideController = require("../controllers/ride.controller");

route.post("/create-ride", authMiddleware.authUser, rideController.createRide);

module.exports = route;
