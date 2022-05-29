const express = require("express");
const helmet = require("helmet");
const apiKey = require("./middlewares/api-key.js");
const logRequest = require("./middlewares/log-request.js");
const nocache = require("nocache");

const init = require("./database/database-init.js");
const birthdayRequest = require("./operations/birthday-request.js");

const app = express();
const version = require("../package.json").version || "Unknown";
const port = process.env.PORT || 80;
const environment = process.env.NODE_ENV || "development";
const API_KEY = "TimesYourAge";

// adding Helmet to enhance your API's security
app.use(helmet());
app.use(logRequest());
// app.use(apiKey("1234"));

app.use("/", express.static("src/static"));

app.get("/birthday/:date?", birthdayRequest);
app.get("/date/:date?", birthdayRequest);
app.get("/birthdays", function (req, res) {
  res.json({
    message: "TimesYourAge Server (" + version + ")",
  });
  res.end();
});

app.listen(port, async function () {
  console.log("\n==============================");
  console.log("TimesYourAge Server v" + version);
  console.log("port: " + port);
  console.log("env: " + environment + "\n");
  init();
});
