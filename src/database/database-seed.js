const fs = require("fs");
const repository = require("../repositories/birthdays-repository.js");
const languages = require("../../package.json").languages;

function print(...args) {
  console.log("[seed]", ...args);
}

async function readDirectory(path) {
  print("reading directory", path);

  let filenames = fs.readdirSync(path);
  let count = 0;

  for (filename of filenames) {
    let filepath = path + "/" + filename;
    let objects = JSON.parse(fs.readFileSync(filepath));
    if (objects.length === 0) continue;
    await repository.insertMany(objects);
    count += objects.length;
  }

  print("read directory", path, count, "birthdays");
}

async function seed() {
  print("start");
  for (language of languages) {
    await readDirectory("data/" + language);
  }
  print("end");
}

module.exports = seed;
