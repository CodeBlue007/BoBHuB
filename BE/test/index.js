const { createAdmins } = require("./create-admin");

async function setData() {
  await createAdmins();
}

module.exports = { setData };
