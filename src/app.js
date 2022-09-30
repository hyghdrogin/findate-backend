const express = require("express");
const cors = require("cors");
// const cookieSession = require("cookie-session");

const client = require("./database/config/config");
const router = require("./routes/index");
const config = require("./database/config/index");

const app = express();
const port = config.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to Findate app");
});

// logout
app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

// Global 404 error handler
app.use((req, res) => res.status(404).send({
  status: "error",
  error: "Not found",
  message: "Route not correct kindly check url.",
}));

(async () => {
  process.on("warning", e => config.logger.warn(e.stack));
  app.listen(config.PORT || 4000, async () => {
    console.log(`${config.APP_NAME} API listening on ${port || 4000}`);
  });
})();

process.on("unhandledRejection", error => {
  console.log("FATAL UNEXPECTED UNHANDLED REJECTION!", error.message);
  console.error("\n\n", error, "\n\n");
  //  throw error;
});

module.exports = app;
