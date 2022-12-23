const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("food");

class FoodModel {
  async create(foodDTO) {
    const { keyArr, valArr } = o.objToKeyValueArray(foodDTO);
    const query = o.makeInsertQuery(keyArr, valArr);
    console.log(query);

    const [result] = await pool.query(query);
    return result;
  }
  async getById(foodId) {
    const whereArr = o.objToQueryArray({ foodId });
    const query = o.makeSelectQuery(undefined, whereArr);
    console.log(query);

    const [food] = await pool.query(query);
    return food[0];
  }
  async getByShopId(shopId) {
    const whereArr = o.objToQueryArray({ shopId });
    const query = o.makeSelectQuery(undefined, whereArr);
    console.log(query);

    const [food] = await pool.query(query);
    return food;
  }

  async update(newFoodDTO, foodDTO) {
    const newDTO = o.objToQueryArray(newFoodDTO);
    const oldDTO = o.objToQueryArray(foodDTO);
    const query = o.makeUpdateQuery(newDTO, oldDTO);

    console.log(query);
    const [result] = await pool.query(query);
    return result;
  }

  async deleteById(foodId) {
    const whereArr = o.objToQueryArray({ foodId });
    const query = o.makeDeleteQuery(whereArr);
    console.log(query);

    const [result] = await pool.query(query);
    return result;
  }
}

const foodModel = new FoodModel();

module.exports = { foodModel };
