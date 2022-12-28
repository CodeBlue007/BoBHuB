const { foodModel } = require("../src/db/models");
const { FoodData } = require("./data/food-data");
const createDefaultFood = async (match) => {
  console.log("default food 생성중");
  const foodData = FoodData.map((food) => {
    const shop = match.find(({ name }) => food.shopId === name);
    food.shopId = shop.shopId;
    return food;
  });
  // console.log(foodData);
  return Promise.all(FoodData.map(async (data) => await foodModel.create(data)))
    .then(() => {
      console.error("default food 생성 성공");
    })
    .catch((err) => {
      console.log(err);
      console.error("default food 생성 실패");
    });
};

module.exports = { createDefaultFood };
