const database = require("../src/database/database.js");

async function drop() {
  let db = await database.databaseConnection();
  let collections = await db.listCollections({}, { nameOnly: true }).toArray();

  console.log("Found collections: ", collections.length);

  for (collection of collections) {
    console.log("Dropping collection " + collection.name);
    await database.drop(collection.name);
    console.log("Dropped collection " + collection.name);
  }

  process.exit(0);
}

drop();
