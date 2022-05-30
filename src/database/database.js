const { MongoMemoryServer } = require("mongodb-memory-server");
const MongoClient = require("mongodb").MongoClient;

var connection = null;

async function getUri() {
  const mongod = new MongoMemoryServer();
  await mongod.start();
  return mongod.getUri();
}

async function clientConnection() {
  if (!connection) connection = await MongoClient.connect(await getUri(), {});
  return connection;
}

async function databaseConnection() {
  return clientConnection().then((client) => client.db("times-your-age"));
}

async function collection(name) {
  return databaseConnection().then((db) => db.collection(name));
}

async function drop(collectionName) {
  return collection(collectionName).then((c) => c.drop());
}

exports.clientConnection = clientConnection;
exports.databaseConnection = databaseConnection;
exports.collection = collection;
exports.drop = drop;
