const database = require("./database.js");

async function migrate() {
  console.log("[migrate] start");
  let connection = await database.databaseConnection();

  await connection.createCollection("birthdays");
  let birthdaysCollection = await connection.collection("birthdays");

  await birthdaysCollection.createIndex({ name: 1, birthday: 1 });
  await birthdaysCollection.createIndex({ year: 1 });
  await birthdaysCollection.createIndex({ month: 1 });
  await birthdaysCollection.createIndex({ day: 1 });
  console.log("[migrate] end");
}

module.exports = migrate;
