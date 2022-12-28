const { shopModel } = require("../src/db/models");
const { foodModel } = require("../src/db/models");
const { FoodData } = require("./data/food-data");
const createDefaultFood = async () => {
  console.log("default shop 생성중");
  // console.log(FoodData);
  try {
    Promise.all(
      FoodData.map(async (data) => {
        const shopName = data.shopId;
        console.log(shopName);
        const foundShopByName = await shopModel.getByShopName(shopName);
        console.log(foundShopByName);
        data.shopId = parseInt(foundShopByName.shopId);
        await foodModel.create(data);
      })
    );
  } catch (err) {
    console.log(err);
    console.error("default shop 생성 실패");
  }
  console.error("default shop 생성 성공");
};

module.exports = { createDefaultFood };
