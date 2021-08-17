const express = require("express");

const app = express();
const application_version = require('./package.json').version || "Unknown";
const port = process.env.PORT || 2303;
const environment = process.env.NODE_ENV || 'development';

// === ------------------------------------------------------------------------------ ===
//
// Express Application
// @see: https://expressjs.com/de/guide/routing.html
// === ------------------------------------------------------------------------------ ===

// for parsing application/json
// app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.json({
        message: "Wordclouds (" + application_version + ")"
    });
    res.end();
});

app.get('/birthdays', function (req, res) {

});

app.listen(port, function () {
    console.log("Running TimesYourAge Server (Version " + application_version + ")");
    console.log("Listening on port: " + port + "\n");
    console.log("Environment: " + environment + "\n");
});