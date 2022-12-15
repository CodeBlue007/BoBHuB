const { shopService } = require("../services");

class ShopController {
  async create(req, res, next) {
    const { name, distance, address, menu, shopPicture, like, description } = req.body;

    try {
      const addedShop = await shopService.create({
        name,
        distance,
        address,
        menu,
        shopPicture,
        like,
        description,
      });
      return res.status(200).json(addedShop);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const shopList = await shopService.getAll();
      return res.status(200).json(shopList);
    } catch (e) {
      next(e);
    }
  }

  async getByShopId(req, res, next) {
    try {
      const { shopId } = req.params;
      const shopList = await shopService.getByShopId(shopId);
      return res.status(200).json(shopList);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { shopId } = req.params;
      const { name, distance, address, menu, shopPicture, like, description } = req.body;

      const updatedShop = await shopService.update(
        { name, distance, address, menu, shopPicture, like, description },
        shopId
      );

      return res.status(200).json(updatedShop);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { shopId } = req.params;
      const deletedShop = await shopService.deleteById(shopId);
      res.status(200).json(deletedShop);
    } catch (e) {
      next(e);
    }
  }
}

const shopController = new ShopController();

module.exports = { shopController };
