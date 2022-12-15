const { foodService } = require("../services");

class FoodController {
  async create(req, res, next) {
    const { picture, name, price } = req.body;
    try {
      const addedFood = await foodService.create({ picture, name, price });
      return res.status(200).json(addedFood);
    } catch (e) {
      next(e);
    }
  }

  async getByShopId(req, res, next) {
    try {
      const { shopId } = req.params;
      const foodList = await foodService.getByShopId(shopId);
      return res.status(200).json(foodList);
    } catch (e) {
      next(e);
    }
  }

  //   async getAll(req, res, next) {
  //     try {
  //       const foodList = await foodService.getAll();
  //       return res.status(200).json(foodList);
  //     } catch (e) {
  //       next(e);
  //     }
  //   }

  async update(req, res, next) {
    try {
      const { foodId } = req.params;
      const { picture, name, price } = req.body;
      const updatedFood = await foodService.update({ picture, name, price }, foodId);

      return res.status(200).json(updatedFood);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { foodId } = req.params;
      const deletedFood = await foodService.deleteById(foodId);
      res.status(200).json(deletedFood);
    } catch (e) {
      next(e);
    }
  }
}

const foodController = new FoodController();

module.exports = { foodController };
