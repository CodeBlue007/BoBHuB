const { pool } = require("../mysql-pool");
const o = new (require("../../util/make-query"))("category");

class CategoryModel {
  async create(categoryDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(categoryDTO);
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

  async update(newCategoryDTO, categoryDTO) {
    try {
      const newDTO = o.objToQueryArray(newCategoryDTO);
      const oldDTO = o.objToQueryArray(categoryDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      console.log(query);
      const [updatedCategory] = await pool.query(query);
      return updatedCategory;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(category) {
    try {
      const whereArr = o.objToQueryArray({ category });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const deletedCategory = await pool.query(query);
      return deletedCategory;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const categoryModel = new CategoryModel();

module.exports = { categoryModel };
