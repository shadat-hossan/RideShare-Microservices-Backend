require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const rideRoutes = require("./routes/ride.routes");
const connect = require("./db/db");
const cokkieParser = require("cookie-parser");
const rabitMq = require("./service/rabit");

connect();

rabitMq.connect();

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cokkieParser());
app.use(morgan("dev"));

app.use("/", rideRoutes);

app.get("/", (req, res) => {
  res.send("Hello Ride!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
