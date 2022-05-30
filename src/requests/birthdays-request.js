const repository = require("../repositories/birthdays-repository.js");
const utils = require("./request-utils.js");

function birthdaysRequest(req, res) {
  const date = utils.explode(req.query.date || utils.isoDate());
  const language = utils.makeSafeLanguage(req.query.lang || "en");

  repository
    .find(date.month, date.day, language)
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
