const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

const captainAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({
      token: token,
    });

    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded.id);

    if (!captain) {
      return res.status(404).json({ message: "captain not found" });
    }

    req.captain = captain;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = captainAuth;
