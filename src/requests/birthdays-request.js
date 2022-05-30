const repository = require("../repositories/birthdays-repository.js");
const utils = require("./request-utils.js");
const defaultLimit = 20;

function safeNumber(num) {
  return String(+num) === "NaN" ? defaultLimit : +num;
}

function birthdaysRequest(req, res) {
  const date = utils.explode(req.query.date || utils.isoDate());
  const language = utils.makeSafeLanguage(req.query.lang || "en");
  const limit = safeNumber(req.query.limit || defaultLimit);

  console.log("limit", limit);

  repository
    .find(date.month, date.day, language, limit)
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
