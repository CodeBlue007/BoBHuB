const { shopModel } = require("../src/db/models");
const { ShopData } = require("./data/shop-data");
const createDummyShop = async () => {
  console.log("dummy shop 생성중");
  console.log(ShopData);
  try {
    Promise.all(
      ShopData.map(async (data) => {
        await shopModel.create(data);
      })
    );
  } catch (err) {
    console.log(err);
    console.error("dummy shop 생성 실패");
  }
  console.error("dummy shop 생성 성공");
};

module.exports = { createDummyShop };
