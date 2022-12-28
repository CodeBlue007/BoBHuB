const { shopModel } = require("../src/db/models");
const { ShopData } = require("./data/shop-data");
const createDefaultShop = async () => {
  console.log("default shop 생성중");
  // console.log(ShopData);
  const match = [];
  return Promise.all(
    ShopData.map(async (data) => {
      const t = await shopModel.create(data);
      match.push({ shopId: t.insertId, name: data.name });
    })
  )
    .then(() => {
      console.error("default shop 생성 성공");
      // console.error(match);
      return match;
    })
    .catch((err) => {
      console.log(err);
      console.error("default shop 생성 실패");
    });
};

module.exports = { createDefaultShop };
