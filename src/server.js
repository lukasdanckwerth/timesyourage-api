const express = require("express");
const helmet = require("helmet");
const apiKey = require("./middlewares/api-key.js");
const logRequest = require("./middlewares/log-request.js");

const init = require("./database/database-init.js");
const birthdayRequest = require("./requests/birthday-request.js");
const birthdaysRequest = require("./requests/birthdays-request.js");

const package = require("../package.json");

const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || "development";

function info() {
  return {
    name: package.name,
    version: package.version,
    environment: environment,
    languages: package.languages,
  };
}

app.use(helmet());
if (environment === "development") app.use(logRequest());

app.get("/birthday", birthdayRequest);
app.get("/birthdays", birthdaysRequest);

app.get("/", function (req, res) {
  res.json(info());
  res.end();
});

app.listen(port, () => init());
