const { foodModel, shopModel } = require("../db/models");
const { imageDeleter } = require("../middlewares");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class FoodService {
  constructor(foodModel) {
    this.foodModel = foodModel;
    this.shopModel = shopModel;
  }

  async create(foodDTO) {
    // shopModel에서 shop 존재 여부 검증
    const shop = await this.shopModel.getByShopId(foodDTO.shopId);
    if (!shop) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 식당이 없습니다.");
    }
    const food = await this.foodModel.getByName(foodDTO.name);
    console.log(food);
    if (food) {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "동일한 대표 메뉴가 존재합니다."
      );
    }
    const result = await this.foodModel.create(foodDTO);
    return result;
  }

  async getByShopId(shopId) {
    const food = await this.foodModel.getByShopId(shopId);
    return food;
  }
  // 오류?
  async update(newFoodDTO, foodId) {
    const food = await this.foodModel.getById(foodId);
    if (!food) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 대표메뉴가 없습니다.");
    }
    const result = await this.foodModel.update(newFoodDTO, { foodId });
    return result;
  }

  async updateImage(newPicture, foodId) {
    const food = await foodModel.getById(foodId);
    if (!food) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 대표메뉴가 없습니다.");
    }
    if (food.picture) imageDeleter(food.picture);
    const newFoodDTO = { picture: newPicture };

    const result = await this.foodModel.update(newFoodDTO, { foodId });
    return result;
  }

  async deleteById(foodId) {
    const food = await this.foodModel.getById(foodId);
    if (!food) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 대표메뉴가 없습니다.");
    }
    const { picture } = food;
    if (picture) imageDeleter(picture);

    const result = await this.foodModel.deleteById(foodId);
    return result;
  }
}

const foodService = new FoodService(foodModel);

module.exports = { foodService };
