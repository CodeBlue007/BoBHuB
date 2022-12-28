const { createAdmins } = require("./create-admin");
const { createDefaultCategory } = require("./create-default-category");
const { createDefaultShop } = require("./create-default-shop");
const { createDefaultFood } = require("./create-default-food");

async function setData() {
  await createAdmins();
  await createDefaultCategory();
  const match = await createDefaultShop();

  // console.log("match", match);
  await createDefaultFood(match);
}

module.exports = { setData };
