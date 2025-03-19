const Ride = require("../models/ride.model");

const createRide = async (req, res) => {
  try {
    const { pickup, destination } = req.body;

    const newRide = new Ride({
      user: req.user._id,
      pickup,
      destination,
    });

    await newRide.save();

    res.status(201).json({ message: "Ride created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRide,
};
