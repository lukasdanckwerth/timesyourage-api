const repository = require("../repositories/birthdays-repository.js");

function isoDate() {
  return new Date().toISOString().split("T")[0];
}

function explode(date) {
  const parts = date.split("-");
  return { year: +parts[0], month: +parts[1], day: +parts[2] };
}

function birthdaysRequest(req, res) {
  const date = explode(req.params.date || isoDate());
  repository
    .find(date.month, date.day)
    .then((birthdays) => {
      res.json({ count: birthdays.length, birthdays });
      res.end();
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ error: "Internal Error." });
      res.end();
    });
}

module.exports = birthdaysRequest;
