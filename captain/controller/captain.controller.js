const captainModel = require("../models/captain.model");
const blacklisttokenModel = require("../models/blacklistToken.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const captain = await captainModel.findOne({ email });

    if (captain) {
      return res.status(400).json({ message: "captain already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newcaptain = new captainModel({
      name,
      email,
      password: hashPassword,
    });

    await newcaptain.save();

    const tokern = jwt.sign(
      { email: newcaptain.email, id: newcaptain._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", tokern);

    res.status(201).json({ message: "captain created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(404).json({ message: "captain not found" });
    }

    const isMatch = await bcrypt.compare(password, captain.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: captain.email, id: captain._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    delete captain._doc.password;

    res.cookie("token", token);
    res.status(200).json({ captain, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    await blacklisttokenModel.create({ token });
    res.clearCookie("token");
    res.send({ message: "captain logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const porfile = async (req, res) => {
  try {
    delete req.captain._doc.password;
    res.status(200).json(req.captain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const captain = await captainModel.findById(req.captain._id);
    captain.isActivated = !captain.isActivated;
    await captain.save();
    res
      .status(200)
      .json({ message: "captain availability updated", data: captain });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  porfile,
  toggleAvailability,
};
