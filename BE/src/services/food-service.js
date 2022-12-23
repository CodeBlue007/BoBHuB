const { foodModel } = require("../db/models");
const buildRes = require("../utils/build-response");
const { imageDeleter } = require("../middlewares");
const { BadRequest, NotFound } = require("../utils/error-factory");

class FoodService {
  constructor(foodModel) {
    this.foodModel = foodModel;
  }

  async create(foodDTO) {
    try {
      const result = await this.foodModel.create(foodDTO);
      return buildRes("c", result);
    } catch {
      throw new BadRequest("form-data에 작성한 내용에 오류가 있습니다.");
    }
  }

  async getByShopId(shopId) {
    if (!shopId) {
      throw new BadRequest("Query 입력값이 비어있습니다.");
    }
    const food = await this.foodModel.getByShopId(shopId);
    return food;
  }
  // 오류?
  async update(newFoodDTO, foodId) {
    const food = await this.foodModel.getById(foodId);
    if (!food) {
      throw new NotFound("존재하는 대표메뉴가 없습니다.");
    }
    try {
      const result = await this.foodModel.update(newFoodDTO, { foodId });
      return buildRes("u", result);
    } catch {
      throw new BadRequest("Body에 작성한 내용에 오류가 있습니다.");
    }
  }

  async updateImage(newPicture, foodId) {
    const food = await foodModel.getById(foodId);
    if (!food) {
      throw new NotFound("존재하는 대표메뉴가 없습니다.");
    }
    if (food.picture) imageDeleter(food.picture);
    const newFoodDTO = { picture: newPicture };

    try {
      const result = await this.foodModel.update(newFoodDTO, { foodId });
      return buildRes("u", result);
    } catch {
      throw new BadRequest("form-data에 작성한 내용에 오류가 있습니다.");
    }
  }

  async deleteById(foodId) {
    if (!foodId) {
      throw new BadRequest("Parameter 입력값이 숫자가 아니거나 비어있습니다.");
    }
    const food = await this.foodModel.getById(foodId);
    if (!food) {
      throw new NotFound("존재하는 대표메뉴가 없습니다.");
    }
    const { picture } = food;
    if (picture) imageDeleter(picture);

    const result = await this.foodModel.deleteById(foodId);
    return buildRes("d", result);
  }
}

const foodService = new FoodService(foodModel);

module.exports = { foodService };
