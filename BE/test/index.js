const { createAdmins } = require("./create-admin");
const { createDummyShop } = require("./create-dummyshop");

async function setData() {
  // await createAdmins();
  await createDummyShop();
}

module.exports = { setData };
