const app = require("./app");
const dotenv = require("dotenv");
const connectDb = require("./config/database");

//handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");

  process.exit(1);
});

//CONFIGURATION
dotenv.config({ path: ".env" });

//connecting db
connectDb();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is Live at http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
