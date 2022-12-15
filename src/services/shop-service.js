const { shopModel } = require("../db");

class ShopService {
  constructor(shopModel) {
    this.shopModel = shopModel;
  }

  async create(shopInfo) {
    const createdShop = await this.shopModel.create(shopInfo);
    return createdShop;
  }

  async getAll() {
    const shops = await this.shopModel.getAll();
    return shops;
  }

  async getByShopId(shopId) {
    const shops = await this.shopModel.getByShopId(shopId);
    return shops;
  }

  async update(newshopDTO, shopId) {
    const shop = await this.shopModel.update(newshopDTO, { shopId });

    return shop;
  }

  async delete(shopId) {
    await shopModel.deleteById(shopId);
  }
}

const shopService = new ShopService(shopModel);

module.exports = { shopService };
