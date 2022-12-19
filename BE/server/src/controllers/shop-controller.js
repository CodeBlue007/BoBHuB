const { shopService } = require("../services");

class ShopController {
  async create(req, res, next) {
    const { category, name, address, description } = req.body;
    const distance = parseInt(req.body.distance);

    try {
      const result = await shopService.create({
        category,
        name,
        distance,
        address,
        // menu,
        // shopPicture,
        description,
      });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async count(req, res, next) {
    try {
      const totalData = await shopService.count();
      return res.status(200).json(totalData);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req, res, next) {
    try {
      const page = Number(req.query.page || 1);
      const perpage = Number(req.query.perpage || 8);

      const shopList = await shopService.getAll(page, perpage);
      return res.status(200).json(shopList);
    } catch (e) {
      next(e);
    }
  }

  async getByShopId(req, res, next) {
    try {
      const shopId = parseInt(req.params.shopId);
      const shopList = await shopService.getByShopId(shopId);
      return res.status(200).json(shopList);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const shopId = parseInt(req.params.shopId);
      const { category, name, address, description } = req.body;
      const distance = parseInt(req.body.distance);
      const result = await shopService.update(
        {
          category,
          name,
          distance,
          address,
          // menu,
          // shopPicture,
          description,
        },
        shopId
      );

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { shopId } = req.params;
      const result = await shopService.deleteById(shopId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const shopController = new ShopController();

module.exports = { shopController };
