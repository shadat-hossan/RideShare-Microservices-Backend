const mongoose = require("mongoose");

function connect() {
  return mongoose
    .connect(process.env.mongoURI)
    .then(() => {
      console.log("User service connected to mongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connect;
