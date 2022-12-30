const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("category");
const { buildRes, logger } = require("../../utils");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class CategoryModel {
  async create(categoryDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(categoryDTO);
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

  async getById(category) {
    try {
      const whereArr = o.objToQueryArray({ category });
      const query = o.makeSelectQuery({ whereArr });
      logger.info(query);

      const [categoryName] = await pool.query(query);
      return categoryName;
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

      const [categories] = await pool.query(query);
      return categories;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async update(newCategoryDTO, categoryDTO) {
    try {
      const newDTO = o.objToQueryArray(newCategoryDTO);
      const oldDTO = o.objToQueryArray(categoryDTO);
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

  async deleteById(category) {
    try {
      const whereArr = o.objToQueryArray({ category });
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
}

const categoryModel = new CategoryModel();

module.exports = { categoryModel };
