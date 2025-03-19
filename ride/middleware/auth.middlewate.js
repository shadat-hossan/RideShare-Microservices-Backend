const jwt = require("jsonwebtoken");
const axios = require("axios");
const BASE_URL = process.env.BASE_URL;

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const responce = await axios.get(`${BASE_URL}/user/porfile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const usr = responce.data;
    if(!usr) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.user = data;

    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = {
  authUser,
};
