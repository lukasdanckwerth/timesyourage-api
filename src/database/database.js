const { MongoMemoryServer } = require("mongodb-memory-server");
const MongoClient = require("mongodb").MongoClient;

const inMemory = true;
const url = "mongodb://root:root@localhost:27017";

var connection = null;

async function getUri() {
  if (inMemory) {
    const mongod = new MongoMemoryServer();
    await mongod.start();
    return mongod.getUri();
  } else {
    return url;
  }
}

async function clientConnection() {
  if (!connection) connection = await MongoClient.connect(await getUri(), {});
  return connection;
}

async function databaseConnection() {
  return clientConnection().then((client) => client.db("times-your-age"));
}

async function databaseCollection(name) {
  return databaseConnection().then((db) => db.collection(name));
}

async function drop(collectionName) {
  return databaseCollection(collectionName).then((c) => c.drop());
}

async function birthdaysCollection() {
  return databaseCollection("birthdays");
}

async function datesCollection() {
  return databaseCollection("dates");
}

exports.clientConnection = clientConnection;
exports.databaseConnection = databaseConnection;
exports.birthdaysCollection = birthdaysCollection;
exports.datesCollection = datesCollection;
exports.drop = drop;
