const { shopModel } = require("../db/models");
const { pagination } = require("../utils");
const buildRes = require("../utils/build-response");
const { imageDeleter } = require("../middlewares");
const { BadRequest, NotFound } = require("../utils/error-factory");

class ShopService {
  constructor(shopModel) {
    this.shopModel = shopModel;
  }

  async create(shopDTO) {
    try {
      const result = await this.shopModel.create(shopDTO);
      return buildRes("c", result);
    } catch {
      throw new BadRequest("form-data에 작성한 내용에 오류가 있습니다.");
    }
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
    if (!shopId) {
      throw new BadRequest("Parameter 입력값이 숫자가 아니거나 비어있습니다.");
    }
    const shop = await this.shopModel.getByShopId(shopId);
    return shop;
  }

  async update(newShopDTO, shopId) {
    if (!shopId) {
      throw new BadRequest("Parameter 입력값이 숫자가 아니거나 비어있습니다.");
    }
    const shop = await this.shopModel.getByShopId(shopId);
    console.log(shop);
    if (!shop) {
      throw new NotFound("존재하는 식당이 없습니다.");
    }
    let { menu, shopPicture } = newShopDTO;
    if (menu || shopPicture) {
      if (menu) imageDeleter(shop.menu);
      if (shopPicture) imageDeleter(shop.shopPicture);
    }

    try {
      const result = await this.shopModel.update(newShopDTO, { shopId });
      return buildRes("u", result);
    } catch {
      throw new BadRequest("form-data에 작성한 내용에 오류가 있습니다.");
    }
  }

  async deleteById(shopId) {
    if (!shopId) {
      throw new BadRequest("Parameter 입력값이 숫자가 아니거나 비어있습니다.");
    }
    const shop = await this.shopModel.getByShopId(shopId);
    if (!shop) {
      throw new NotFound("존재하는 식당이 없습니다.");
    }

    const { menu, shopPicture } = shop;
    if (menu) imageDeleter(menu);
    if (shopPicture) imageDeleter(shopPicture);

    const result = await this.shopModel.deleteById(shopId);
    return buildRes("d", result);
  }
}

const shopService = new ShopService(shopModel);

module.exports = { shopService };
