const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
var bodyParser = require("body-parser");
// enabling cross origin access
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const auth = require("./routes/authRoute");
const post = require("./routes/postRoute");

//json transfer
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//routes
app.use("/api/v1", auth);
app.use("/api/v1", post);

//error middleware
app.use(errorMiddleware);

module.exports = app;
