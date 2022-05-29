const migrate = require("./database-migrate.js");
const seed = require("./database-seed.js");

module.exports = async function () {
  console.log("[init] start");
  await migrate();
  await seed();
  console.log("[init] end");
};
