const { foodService } = require("../services");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class FoodController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const price = parseInt(req.body.price);
      const shopId = parseInt(req.body.shopId);
      const picture = req.file ? req.file.location : null;

      const result = await foodService.create({ shopId, name, price, picture });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getByShopId(req, res, next) {
    try {
      const shopId = parseInt(req.query.shopId);
      if (!shopId) {
        throw new ErrorFactory(commonErrors.BAD_REQUEST, 400, "Query 입력값이 비어있습니다.");
      }
      const foodList = await foodService.getByShopId(shopId);
      return res.status(200).json(foodList);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const foodId = parseInt(req.params.foodId);
      const { name, price } = req.body;

      const result = await foodService.update({ name, price }, foodId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  async updateImage(req, res, next) {
    try {
      const newPicture = req.file ? req.file.location : null;
      if (!newPicture)
        throw new ErrorFactory(commonErrors.BAD_REQUEST, 400, "요청 오류, 이미지 없음");

      const foodId = parseInt(req.params.foodId);
      const result = await foodService.updateImage(newPicture, foodId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const foodId = parseInt(req.params.foodId);
      if (!foodId) {
        throw new ErrorFactory(
          commonErrors.BAD_REQUEST,
          400,
          "Parameter 입력값이 숫자가 아니거나 비어있습니다."
        );
      }
      const result = await foodService.deleteById(foodId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const foodController = new FoodController();

module.exports = { foodController };
