const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    captian: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    pickup: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "started", "canceled"],
      default: "requested",
    }
  },
  {
    timestamps: true,
  }
);

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
