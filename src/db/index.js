const { sequelize } = require("./models");

sequelize
  .sync()
  .then(() => console.log("정상적으로 DB 서버에 연결되었습니다.  "))
  .catch((err) => "\n DB 연결에 실패하였습니다...\n" + error);

module.exports = {
  ...require("./tables/category-table"),
};
