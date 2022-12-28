const { categoryModel } = require("../src/db/models");
const { ShopData } = require("./data/shop-data");

const createDefaultCategory = async () => {
  console.log("default category 생성중");
  try {
    const categoryList = ShopData.filter(
      (arr, index, callback) =>
        index === callback.findIndex((shop) => shop.category === arr.category)
    ).map(shop=>shop.category)
    console.log(categoryList);
    Promise.all(
      categoryList.map(async (data) => {
        await categoryModel.create({category: data});
      })
    );
  } catch (err) {
    console.log(err);
    console.error("default category 생성 실패");
  }
  console.error("default category 생성 성공");
};

module.exports = { createDefaultCategory };
