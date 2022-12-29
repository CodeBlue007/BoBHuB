const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("user");
const { buildRes, logger } = require("../../utils");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class UserModel {
  async create(userDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(userDTO);
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

  async get(userDTO, filterArr) {
    try {
      const whereArr = o.objToQueryArray(userDTO);
      const query = o.makeSelectQuery({ columnArr: filterArr, whereArr });
      logger.info(query);

      const [user] = await pool.query(query);

      return user;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async getAll() {
    try {
      const query = o.makeSelectQuery({});
      logger.info(query);

      const [users] = await pool.query(query);
      return users;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async update(newUserDTO, userDTO) {
    try {
      const newDTO = o.objToQueryArray(newUserDTO);
      const oldDTO = o.objToQueryArray(userDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      logger.info(query);
      const [result] = await pool.query(query);
      return buildRes("u", result);
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async deleteById(userId) {
    try {
      const where = o.objToQueryArray({ userId });
      const query = o.makeDeleteQuery(where);
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
}

const userModel = new UserModel();

module.exports = { userModel };
