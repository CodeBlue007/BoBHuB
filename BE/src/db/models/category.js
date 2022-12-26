const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("category");
const buildRes = require("../../utils/build-response");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class CategoryModel {
  async create(categoryDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(categoryDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      console.log(query);

      const [result] = await pool.query(query);
      return buildRes("c", result);
    } catch {
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
      console.log(query);

      const [categoryName] = await pool.query(query);
      return categoryName;
    } catch {
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
      console.log(query);

      const [categories] = await pool.query(query);
      return categories;
    } catch {
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
      console.log(query);
      const [result] = await pool.query(query);
      return buildRes("u", result);
    } catch {
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

const categoryModel = new CategoryModel();

module.exports = { categoryModel };
