const wikipedia = require("wikipedia");
const fs = require("fs");
const languages = require("../package.json").languages;

const directoryName = "data";
const months = [...Array(12).keys()].map((d) => d + 1);
const days = [...Array(31).keys()].map((d) => d + 1);

// use for development
// const months = [1];
// const days = [1];

function print(...args) {
  console.log("[grab]", ...args);
}

function createDirectory(name) {
  if (!fs.existsSync(name)) fs.mkdirSync(name, { recursive: true });
}

async function sleep(millies = 1000) {
  await new Promise((r) => setTimeout(r, millies));
}

async function birthsdaysForDate(month, day) {
  return wikipedia.onThisDay({
    type: "births",
    month: "" + month,
    day: "" + day,
  });
}

function reformatBirthdays(birthdays, month, day, language) {
  var birthdaysNew = [];

  for (birthday of birthdays) {
    const date = `${birthday.year}-${month}-${day}`;
    const page = birthday.pages[0];

    if (!page || !page.thumbnail || !page.normalizedtitle) continue;

    const obj = {
      name: page.normalizedtitle,
      birthday: date,
      thumbnail: page.thumbnail.source,
      extract: page.extract,
      year: +birthday.year,
      month: +month,
      day: +day,
      language: language,
    };

    birthdaysNew.push(obj);
  }

  return birthdaysNew;
}

async function grab(language) {
  if (!language) throw new Error("No language given.");

  const directoryPath = directoryName + "/" + language + "/";
  print("grabbing into", directoryPath);
  createDirectory(directoryPath);

  await wikipedia.setLang(language);

  var skipped = 0;
  for (var month of months) {
    for (var day of days) {
      const filePath = directoryPath + `${month}-${day}.json`;

      if (fs.existsSync(filePath)) {
        skipped += 1;
        continue;
      }

      const result = await birthsdaysForDate(month, day);
      if (!result.births) {
        print("no result.births", language, month, day);
        continue;
      }

      const normalized = reformatBirthdays(result.births, month, day, language);
      const content = JSON.stringify(normalized, null, 2);

      fs.writeFileSync(filePath, content);
      print("wrote", filePath);

      await sleep(1000);
    }
  }

  print("skipped", language, skipped);
}

async function run() {
  print("languages", languages);
  for (language of languages) {
    await grab(language);
  }
}

run();
