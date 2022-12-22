const { shopModel } = require("../db/models");
const buildRes = require("../utils/build-response");
const { imageDeleter } = require("../middlewares");

class ShopService {
  constructor(shopModel) {
    this.shopModel = shopModel;
  }

  async create(shopDTO) {
    const result = await this.shopModel.create(shopDTO);
    return buildRes("c", result);
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
    return shop;
  }

  async update(newShopDTO, shopId) {
    const result = await this.shopModel.update(newShopDTO, { shopId });

    return buildRes("u", result);
  }

  async updateImage(newImageDTO, shopId) {
    const shop = await shopModel.getByShopId(shopId);
    if (shop.length === 0) throw new Error("DB에서 id를 검색하지 못했습니다.");

    const { menu, shopPicture } = shop;
    if (menu) imageDeleter(menu);
    if (shopPicture) imageDeleter(shopPicture);

    const result = await this.shopModel.update(newImageDTO, { shopId });
    return buildRes("u", result);
  }

  async deleteById(shopId) {
    const shop = await shopModel.getByShopId(shopId);
    if (shop.length === 0) throw new Error("DB에서 id를 검색하지 못했습니다.");

    const { menu, shopPicture } = shop;
    if (menu) imageDeleter(menu);
    if (shopPicture) imageDeleter(shopPicture);

    const result = await shopModel.deleteById(shopId);
    return buildRes("d", result);
  }
}

const shopService = new ShopService(shopModel);

module.exports = { shopService };
