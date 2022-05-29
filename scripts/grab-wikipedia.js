const wikipedia = require("wikipedia");
const BirthdaysController = require("../src/controller/birthdays.controller.js");
const fs = require("fs");

let bc = new BirthdaysController.BirthdaysController();

const months = [...Array(12).keys()].map((d) => d + 1);
const days = [...Array(31).keys()].map((d) => d + 1);
// const months = [...Array(1).keys()].map((d) => d + 1);
// const days = [...Array(1).keys()].map((d) => d + 1);

async function sleep(millies = 1000) {
  await new Promise((r) => setTimeout(r, millies));
}

async function birthsdaysForDate(month, day) {
  return await wikipedia.onThisDay({
    type: "births",
    month: "" + month,
    day: "" + day,
  });
}

async function addBirthdays(birthdays, month, day) {
  for (birthday of birthdays) {
    const date = `${birthday.year}-${month}-${day}`;
    const page = birthday.pages[0];
    const name = page.normalizedtitle;
    const obj = {
      name: page.normalizedtitle,
      birthday: date,
      thumbnail: page.thumbnail,
      extract: page.extract,
    };

    let candidate = await bc.get(name, date);
    if (candidate) {
      continue;
    }

    await bc.create(obj);
  }
}

async function run() {
  // const loadedContent = fs.readFileSync("test.json").toString();
  // const parsedContent = JSON.parse(loadedContent);

  // addBirthdays(parsedContent.births, "1", "1");

  await wikipedia.setLang("de");

  for (month of months) {
    for (day of days) {
      const filename = `${month}-${day}.json`;
      console.log(filename);

      const result = await birthsdaysForDate(month, day);
      const content = JSON.stringify(result, null, 2);

      fs.writeFileSync("wikidata-raw/" + filename, content);

      sleep(3);
    }
  }
}

run();
