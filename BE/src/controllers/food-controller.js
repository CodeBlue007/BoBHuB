const { foodService } = require("../services");

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
      console.log(shopId);
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
      const picture = req.file ? req.file.location : null;
      if (!picture) throw new Error("요청 오류, 이미지 없음");

      const foodId = parseInt(req.params.foodId);
      const result = await foodService.updateImage(picture, foodId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const foodId = parseInt(req.params.foodId);
      const result = await foodService.deleteById(foodId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const foodController = new FoodController();

module.exports = { foodController };
