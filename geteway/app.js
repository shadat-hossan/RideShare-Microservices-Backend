require("dotenv").config();
const express = require("express");
const expressProxy = require("express-http-proxy");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/user", expressProxy("http://localhost:3001"));

app.listen(PORT, () => {
  console.log(`Geteway Server running on port http://localhost:${PORT}`);
});
