const db = require("../models");
const shop = db.shop;

export class ShopModel {
  async create(shopDTO) {
    try {
      const createdShop = await shop.create(shopDTO);
      return createdShop;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAll() {
    try {
      const shops = await shop.findAll({});
      return shops;
    } catch (err) {
      throw new Error(err);
    }
  }
// id로 참조하는 모든 id를 받게 할 것? 오류가 없다면 id 받는 get들을 묶을 수 있지 않나?
  async getById(id) {
    try {
      const shops = await shop.findByPk(id);
      return shops;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newShopDTO, shopDTO) {
    try {
      const updatedShop = await shop.update(newShopDTO, { where: shopDTO });
      return updatedShop;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(shopId) {
    try {
      const deletedShop = await shop.destroy({ where: { shopId } });C
      return deletedShop;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const shopModel = new ShopModel();

module.exports = { shopModel };
