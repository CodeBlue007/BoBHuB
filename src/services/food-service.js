const { foodModel } = require("../db");

class FoodService {
  constructor(foodModel) {
    this.foodModel = foodModel;
  }

  async create(foodInfo) {
    const createdFood = await this.foodModel.create(foodInfo);
    return createdFood;
  }

  // async getAll() {
  //   const food = await this.foodModel.getAll();
  //   return food;
  // }
  // 넘어가는 결과 객체 table에서 제대로 되는지 확인해야함.
  async getByShopId(shopId) {
    const food = await this.foodModel.getByShopId(shopId);
    return food;
  }

  async update(newFoodDTO, foodId) {
    const food = await this.foodModel.update(newFoodDTO, { foodId });

    return food;
  }

  async deleteById(foodId) {
    await foodModel.deleteById(foodId);
  }
}

const foodService = new FoodService(foodModel);

module.exports = { foodService };
