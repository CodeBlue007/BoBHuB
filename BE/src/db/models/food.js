const { pool } = require("../mysql-pool");
const o = new (require("../../util/build-query"))("food");

class FoodModel {
  async create(foodDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(foodDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async getById(foodId) {
    try {
      const whereArr = o.objToQueryArray({ foodId });
      const query = o.makeSelectQuery(undefined, whereArr);
      console.log(query);

      const [comment] = await pool.query(query);
      return comment[0];
    } catch (err) {
      throw new Error(err);
    }
  }
  async getByShopId(shopId) {
    try {
      const whereArr = o.objToQueryArray({ shopId });
      const query = o.makeSelectQuery(undefined, whereArr);
      console.log(query);

      const [comments] = await pool.query(query);
      return comments;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newFoodDTO, foodDTO) {
    try {
      const newDTO = o.objToQueryArray(newFoodDTO);
      const oldDTO = o.objToQueryArray(foodDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);

      console.log(query);
      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(foodId) {
    try {
      const whereArr = o.objToQueryArray({ foodId });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const foodModel = new FoodModel();

module.exports = { foodModel };
