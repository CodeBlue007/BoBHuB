const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("pick");
const { buildRes, logger } = require("../../utils");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class PickModel {
  async create(pickDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(pickDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      logger.info(query);

      const [result] = await pool.query(query);
      return buildRes("c", result);
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async delete(pickDTO) {
    try {
      const whereArr = o.objToQueryArray(pickDTO);
      const query = o.makeDeleteQuery(whereArr);
      logger.info(query);
      const [result] = await pool.query(query);
      return buildRes("d", result);
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async get(pickDTO) {
    try {
      const whereArr = o.objToQueryArray(pickDTO);
      const query = o.makeSelectQuery({ whereArr });
      logger.info(query);

      const [picks] = await pool.query(query);

      return picks;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }
}

const pickModel = new PickModel();

module.exports = { pickModel };
