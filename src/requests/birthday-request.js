const repository = require("../repositories/birthdays-repository.js");
const utils = require("./request-utils.js");

function birthdayRequest(req, res) {
  const date = utils.explode(req.query.date || utils.isoDate());
  const language = utils.makeSafeLanguage(req.query.lang || "en");

  repository
    .random(date.month, date.day, language)
    .then((birthday) => {
      res.json(birthday);
      res.end();
    })
    .catch((error) => {
      console.log("error", error);
      res.json({ error: "Internal Error." });
      res.end();
    });
}

module.exports = birthdayRequest;
