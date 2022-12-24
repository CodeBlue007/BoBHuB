const { shopService } = require("../services");

class ShopController {
  async create(req, res, next) {
    const { category, name, address, description } = req.body;
    const distance = parseInt(req.body.distance);
    const menu = req.files?.menu ? req.files.menu[0].location : null;
    const shopPicture = req.files?.shopPicture ? req.files.shopPicture[0].location : null;

    try {
      const result = await shopService.create({
        category,
        name,
        distance,
        address,
        menu,
        shopPicture,
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
      const shopList = await shopService.getAll();
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
          description,
        },
        shopId
      );

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async updateImage(req, res, next) {
    try {
      const { menu, shopPicture } = req.files;
      if (!(menu && shopPicture)) throw new Error("요청 오류, 이미지 없음");

      const newImageDTO = {};
      newImageDTO.menu = menu ? menu[0].location : null;
      newImageDTO.shopPicture = shopPicture ? shopPicture[0].location : null;

      const shopId = parseInt(req.params.shopId);

      const result = await shopService.updateImage(newImageDTO, shopId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const shopId = parseInt(req.params.shopId);
      const result = await shopService.deleteById(shopId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const shopController = new ShopController();

module.exports = { shopController };
