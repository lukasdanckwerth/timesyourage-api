const languages = require("../../package.json").languages;

function isoDate() {
  return new Date().toISOString().split("T")[0];
}

function explode(date) {
  const parts = date.split("-");
  return { year: +parts[0], month: +parts[1], day: +parts[2] };
}

function makeSafeLanguage(language) {
  return languages.includes(language) ? language : "en";
}

module.exports = {
  isoDate,
  explode,
  makeSafeLanguage,
};
