const { createAdmins } = require("./create-admin");
const { createDummyShop } = require("./create-dummyshop");
const { createDummyFood } = require("./create-dummyfood");
const { createDummyCategory } = require("./create-dummycategory");

async function setData() {
  await createAdmins();
  await createDummyCategory();
  await createDummyShop();
  // await createDummyFood();
}

module.exports = { setData };
