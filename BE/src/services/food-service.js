const { foodModel } = require("../db/models");
const buildRes = require("../utils/build-response");
const { imageDeleter } = require("../middlewares");

class FoodService {
  constructor(foodModel) {
    this.foodModel = foodModel;
  }

  async create(foodDTO) {
    const result = await this.foodModel.create(foodDTO);
    return buildRes("c", result);
  }

  async getByShopId(shopId) {
    const food = await this.foodModel.getByShopId(shopId);
    return food;
  }

  async update(newFoodDTO, foodId) {
    const result = await this.foodModel.update(newFoodDTO, { foodId });
    return buildRes("u", result);
  }

  async updateImage(newPicture, foodId) {
    const food = await foodModel.getById(foodId);
    if (food.length === 0) throw new Error("DB에서 id를 검색하지 못했습니다.");

    if (food.picture) imageDeleter(food.picture);

    const newFoodDTO = { picture: newPicture };

    const result = await this.foodModel.update(newFoodDTO, { foodId });
    return buildRes("u", result);
  }

  async deleteById(foodId) {
    const food = await foodModel.getById(foodId);
    if (food.length === 0) throw new Error("DB에서 id를 검색하지 못했습니다.");

    const { picture } = food;
    if (picture) imageDeleter(picture);

    const result = await foodModel.deleteById(foodId);
    return buildRes("d", result);
  }
}

const foodService = new FoodService(foodModel);

module.exports = { foodService };
