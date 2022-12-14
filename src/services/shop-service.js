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
  // 넘어가는 결과 객체 table에서 제대로 되는지 확인해야함.
  async getById(id) {
    const shops = await this.shopModel.getById(id);
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
