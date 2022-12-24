const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("food");
const buildRes = require("../../utils/build-response");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class FoodModel {
  async create(foodDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(foodDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      console.log(query);

      const [result] = await pool.query(query);
      return buildRes("c", result);
    } catch {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "동일한 대표 메뉴가 존재하거나 Body의 요청 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }
  async getById(foodId) {
    try {
      const whereArr = o.objToQueryArray({ foodId });
      const query = o.makeSelectQuery(undefined, whereArr);
      console.log(query);

      const [food] = await pool.query(query);
      return food[0];
    } catch {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }
  async getByShopId(shopId) {
    try {
      const whereArr = o.objToQueryArray({ shopId });
      const query = o.makeSelectQuery(undefined, whereArr);
      console.log(query);

      const [food] = await pool.query(query);
      return food;
    } catch {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async update(newFoodDTO, foodDTO) {
    try {
      const newDTO = o.objToQueryArray(newFoodDTO);
      const oldDTO = o.objToQueryArray(foodDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);

      console.log(query);
      const [result] = await pool.query(query);
      return buildRes("u", result);
    } catch {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "동일한 대표 메뉴가 존재하거나 Body의 요청 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async deleteById(foodId) {
    try {
      const whereArr = o.objToQueryArray({ foodId });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const [result] = await pool.query(query);
      return buildRes("d", result);
    } catch {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }
}

const foodModel = new FoodModel();

module.exports = { foodModel };
