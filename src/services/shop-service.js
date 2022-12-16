const { shopModel } = require("../db/models");

class ShopService {
  constructor(shopModel) {
    this.shopModel = shopModel;
  }

  async create(shopDTO) {
    const createdShop = await this.shopModel.create(shopDTO);
    return createdShop;
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
    const shop = await this.shopModel.update(newShopDTO, { shopId });

    return shop;
  }

  async delete(shopId) {
    await shopModel.deleteById(shopId);
  }
}

const shopService = new ShopService(shopModel);

module.exports = { shopService };
