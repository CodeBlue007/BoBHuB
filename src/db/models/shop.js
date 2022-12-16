const { pool } = require("../mysql-pool");
const o = new (require("../../util/make-query"))("shop");

class ShopModel {
  async create(shopDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(shopDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      console.log(query);
      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAll() {
    try {
      const query = o.makeSelectQuery();
      console.log(query);

      const [categories] = await pool.query(query);
      return categories;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByShopId(shopId) {
    try {
      const whereArr = o.objToQueryArray({ shopId });
      const query = o.makeSelectQuery(undefined, whereArr);
      console.log(query);

      const [categories] = await pool.query(query);
      return categories;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newShopDTO, shopDTO) {
    try {
      const newDTO = o.objToQueryArray(newShopDTO);
      const oldDTO = o.objToQueryArray(shopDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      console.log(query);

      const [updatedShop] = await pool.query(query);
      return updatedShop;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(shopId) {
    try {
      const whereArr = o.objToQueryArray({ shopId });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const deletedShop = await pool.query(query);
      return deletedShop;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const shopModel = new ShopModel();

module.exports = { shopModel };
