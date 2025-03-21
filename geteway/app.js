require("dotenv").config();
const express = require("express");
const expressProxy = require("express-http-proxy");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/user", expressProxy("http://localhost:3001"));
app.use("/captain", expressProxy("http://localhost:3002"));
app.use("/ride", expressProxy("http://localhost:3003"));

app.listen(PORT, () => {
  console.log(`Geteway Server running on port http://localhost:${PORT}`);
});
