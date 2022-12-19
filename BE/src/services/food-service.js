const { foodModel } = require("../db/models");
const buildRes = require("../util/build-response");

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

  async deleteById(foodId) {
    const result = await foodModel.deleteById(foodId);
    return buildRes("d", result);
  }
}

const foodService = new FoodService(foodModel);

module.exports = { foodService };
