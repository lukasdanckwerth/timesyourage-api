const fs = require("fs");
const repository = require("../repositories/birthdays.repository.js");

async function seed() {
  console.log("[seed] start");

  let filenames = fs.readdirSync("wikidata");
  let count = 0;

  for (filename of filenames) {
    let filepath = "./wikidata/" + filename;
    let objects = JSON.parse(fs.readFileSync(filepath));
    if (objects.length === 0) continue;
    await repository.insertMany(objects);
    count += objects.length;
  }

  console.log("[seed]", count, " birthdays");
}

module.exports = seed;
