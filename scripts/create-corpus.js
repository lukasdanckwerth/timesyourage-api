const fs = require("fs");

var corpus = [];

function print(...args) {
  console.log("[create corpus]", ...args);
}

async function reformatBirthdays(birthdays, month, day) {
  var birthdaysNew = [];

  print("birthdays", birthdays.length);

  for (birthday of birthdays) {
    const date = `${birthday.year}-${month}-${day}`;
    const page = birthday.pages[0];

    if (!page || !page.thumbnail || !page.normalizedtitle) {
      continue;
    }

    const name = page.normalizedtitle;
    const obj = {
      name: page.normalizedtitle,
      birthday: date,
      thumbnail: page.thumbnail,
      extract: page.extract,
      year: +birthday.year,
      month: +month,
      day: +day,
    };

    birthdaysNew.push(obj);
  }

  let filename = month + "-" + day + ".json";
  let newContent = JSON.stringify(birthdaysNew, null, 2);

  fs.writeFileSync("./wikidatanew/" + filename, newContent);
}

async function run() {
  let filenames = fs.readdirSync("wikidata");

  for (filename of filenames) {
    let filepath = "./wikidata/" + filename;
    let month = filename.split(".")[0].split("-")[0];
    let day = filename.split(".")[0].split("-")[1];
    let content = fs.readFileSync(filepath);
    let obj = JSON.parse(content);

    if (!obj.births) {
      continue;
    } else {
      print("filepath", filepath, "month", month, "day", day);
      await reformatBirthdays(obj.births, month, day);
    }
  }

  process.exit(0);
}

run();
