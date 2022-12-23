const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("category");

class CategoryModel {
  async create(categoryDTO) {
    const { keyArr, valArr } = o.objToKeyValueArray(categoryDTO);
    const query = o.makeInsertQuery(keyArr, valArr);
    console.log(query);

    const [result] = await pool.query(query);
    return result;
  }

  async getById(category) {
    const whereArr = o.objToQueryArray({ category });
    const query = o.makeSelectQuery(undefined, whereArr);
    console.log(query);

    const [categoryName] = await pool.query(query);
    return categoryName;
  }

  async getAll() {
    const query = o.makeSelectQuery();
    console.log(query);

    const [categories] = await pool.query(query);
    return categories;
  }

  async update(newCategoryDTO, categoryDTO) {
    const newDTO = o.objToQueryArray(newCategoryDTO);
    const oldDTO = o.objToQueryArray(categoryDTO);
    const query = o.makeUpdateQuery(newDTO, oldDTO);
    console.log(query);
    const [result] = await pool.query(query);
    return result;
  }

  async deleteById(category) {
    const whereArr = o.objToQueryArray({ category });
    const query = o.makeDeleteQuery(whereArr);
    console.log(query);

    const [result] = await pool.query(query);
    return result;
  }
}

const categoryModel = new CategoryModel();

module.exports = { categoryModel };
