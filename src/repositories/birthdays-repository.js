const database = require("../database/database.js");

async function collection() {
  return database.birthdaysCollection();
}

async function all() {
  return collection()
    .then((collection) => collection.find())
    .then((cursor) => cursor.toArray());
}

async function get(name, birthday, language) {
  return collection().then((c) => c.findOne({ name, birthday, language }));
}

async function find(month, day, language) {
  return collection().then((c) => c.find({ month, day, language }).toArray());
}

async function findOne(month, day, language) {
  return collection().then((c) => c.findOne({ month, day, language }));
}

async function insertOne(birthday) {
  return collection().then((c) => c.insertOne(birthday));
}

async function insertMany(birthdays) {
  return collection().then((c) => c.insertMany(birthdays));
}

async function remove(birthdayId) {
  // return collection().then((c) => c.remove());
}

async function random(month, day, language) {
  const aggregate = [
    { $match: { month, day, language } },
    { $sample: { size: 1 } },
  ];
  return collection()
    .then((c) => c.aggregate(aggregate).toArray())
    .then((array) => array[0]);
}

exports.all = all;
exports.get = get;
exports.find = find;
exports.findOne = findOne;
exports.random = random;
exports.add = insertOne;
exports.insertMany = insertMany;
exports.remove = remove;
