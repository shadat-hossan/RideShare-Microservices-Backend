const mongoose = require("mongoose");

function connect() {
  return mongoose
    .connect(process.env.mongoURI)
    .then(() => {
      console.log("Ride service connected to mongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connect;
