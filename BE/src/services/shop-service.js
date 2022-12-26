const { shopModel } = require("../db/models");
const { imageDeleter } = require("../middlewares");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class ShopService {
  constructor(shopModel) {
    this.shopModel = shopModel;
  }

  async create(shopDTO) {
    const existingShopName = await this.shopModel.getByShopName(shopDTO.name);
    if (existingShopName) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "동일한 이름의 식당이 존재합니다.");
    }
    const result = await this.shopModel.create(shopDTO);
    return result;
  }

  async count() {
    const totalData = await this.shopModel.count();
    return totalData;
  }

  async getAll() {
    const shops = await this.shopModel.getAll();
    return shops;
  }

  async getByShopId(shopId) {
    const shop = await this.shopModel.getByShopId(shopId);
    if (!shop) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 식당이 없습니다.");
    }
    return shop;
  }

  async update(newShopDTO, shopId) {
    const existingShop = await this.shopModel.getByShopId(shopId);
    if (!existingShop) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 식당이 없습니다.");
    }
    const existingShopName = await this.shopModel.getByShopName(newShopDTO.name);
    if (existingShopName) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "동일한 이름의 식당이 존재합니다.");
    }
    const result = await this.shopModel.update(newShopDTO, { shopId });
    return result;
  }

  async updateImage(newImageDTO, shopId) {
    const existingShop = await shopModel.getByShopId(shopId);
    if (!existingShop) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 식당이 없습니다.");
    }

    const { menu, shopPicture } = existingShop;
    if (menu) imageDeleter(menu);
    if (shopPicture) imageDeleter(shopPicture);

    const result = await this.shopModel.update(newImageDTO, { shopId });
    return result;
  }

  async deleteById(shopId) {
    const existingShop = await this.shopModel.getByShopId(shopId);
    if (!existingShop) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 식당이 없습니다.");
    }

    const { menu, shopPicture } = existingShop;
    if (menu) imageDeleter(menu);
    if (shopPicture) imageDeleter(shopPicture);

    const result = await this.shopModel.deleteById(shopId);
    return result;
  }
}

const shopService = new ShopService(shopModel);

module.exports = { shopService };
