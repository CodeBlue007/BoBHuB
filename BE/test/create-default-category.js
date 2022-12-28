const { categoryModel } = require("../src/db/models");
const { ShopData } = require("./data/shop-data");

const createDefaultCategory = async () => {
  console.log("default category 생성중");
  const categoryList = ShopData.filter(
    (arr, index, callback) =>
      index === callback.findIndex((shop) => shop.category === arr.category)
  ).map((shop) => shop.category);
  // console.log(categoryList);
  return Promise.all(
    categoryList.map(async (data) => {
      await categoryModel.create({ category: data });
    })
  )
    .then(() => console.error("default category 생성 성공"))
    .catch((err) => {
      console.log(err);
      console.error("default category 생성 실패");
    });
};

module.exports = { createDefaultCategory };
