const { createAdmins } = require("./create-admin");
const { createDummyShop } = require("./create-dummyshop");
const { createDummyFood } = require("./create-dummyfood");

async function setData() {
  // await createAdmins();
  // await createDummyShop();
  await createDummyFood();
}

module.exports = { setData };
