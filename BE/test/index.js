const { createAdmins } = require("./create-admin");
const { createDefaultShop } = require("./create-default-shop");
const { createDefaultFood } = require("./create-default-food");

async function setData() {
  await createAdmins();
  await createDefaultShop();
  // await createDefaultFood();
}

module.exports = { setData };
