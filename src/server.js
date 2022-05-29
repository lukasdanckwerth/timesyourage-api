const express = require("express");
const helmet = require("helmet");
const apiKey = require("./middlewares/api-key.js");
const logRequest = require("./middlewares/log-request.js");
const nocache = require("nocache");

const init = require("./database/database-init.js");
const birthdayRequest = require("./operations/birthday-request.js");
const birthdaysRequest = require("./operations/birthdays-request.js");

const app = express();
const port = process.env.PORT || 3000;

function info() {
  return {
    name: require("../package.json").name,
    version: require("../package.json").version,
    environment: process.env.NODE_ENV || "development",
  };
}

app.use(helmet());
// app.use(logRequest());
// app.use(apiKey("1234"));

app.get("/birthday/:date?", birthdayRequest);
app.get("/birthdays:date?", birthdaysRequest);

app.get("/", function (req, res) {
  res.json(info());
  res.end();
});

app.listen(port, () => init());
