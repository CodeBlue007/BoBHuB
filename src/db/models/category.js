const { pool } = require("../mysql-pool");

class CategoryModel {
  async create(categoryDTO) {
    try {
      const [result] = await pool.query(
        `INSERT INTO category (name) VALUES ("${categoryDTO.name}");`
      );
      const [createdCategory] = await pool.query(
        `SELECT categoryId, name FROM category WHERE categoryId=${result.insertId} AND (category.deletedAt IS NULL) limit 1;`
      );
      return createdCategory[0];
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAll() {
    try {
      const [categories] = await pool.query(
        `SELECT categoryId, name FROM category WHERE (category.deletedAt IS NULL);`
      );
      return categories;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newCategoryDTO, categoryDTO) {
    try {
      const newQuery = Object.entries(newCategoryDTO).reduce(
        (acc, [key, value], idx) =>
          (acc =
            acc +
            (idx !== 0 ? " , " : "") +
            `${key} = ${typeof value === "string" ? '"' + value + '"' : value}`),
        ""
      );
      const oldQuery = Object.entries(categoryDTO).reduce(
        (acc, [key, value], idx) =>
          (acc =
            acc +
            (idx !== 0 ? " AND " : "") +
            `${key} = ${typeof value === "string" ? '"' + value + '"' : value}`),
        ""
      );

      console.log(
        `update category set ${newQuery} WHERE ${oldQuery} AND (category.deletedAt IS NULL);`
      );

      const [updatedCategory] = await pool.query(
        `update category set ${newQuery} WHERE ${oldQuery} AND (category.deletedAt IS NULL);`
      );
      return updatedCategory;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(categoryId) {
    try {
      const deletedCategory = await pool.query(
        `delete from category WHERE categoryId=${categoryId} AND (category.deletedAt IS NULL);`
      );
      return deletedCategory;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const categoryModel = new CategoryModel();

module.exports = { categoryModel };
