const { shopModel } = require("../db/models");
const buildRes = require("../util/build-response");

class ShopService {
  constructor(shopModel) {
    this.shopModel = shopModel;
  }

  async create(shopDTO) {
    const result = await this.shopModel.create(shopDTO);
    return buildRes("c", result);
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

  async deleteById(shopId) {
    const result = await shopModel.deleteById(shopId);
    return buildRes("d", result);
  }
}

const shopService = new ShopService(shopModel);

module.exports = { shopService };
