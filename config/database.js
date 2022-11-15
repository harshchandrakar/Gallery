const mongoose = require("mongoose");

const connectDb = () => {
  mongoose.connect(process.env.DB_URI_DOBBY).then((data) => {
    console.log(`Connected to Mongo server : ${data.connection.host}`);
  });
};

module.exports = connectDb;
