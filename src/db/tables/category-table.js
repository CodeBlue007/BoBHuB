const db = require("../models");
const Category = db.category;

class CategoryModel {
  async totalCount(categoryDTO) {
    const totalCount = await Category.findAndCountAll({ where: categoryDTO });
    return totalCount;
  }

  async create(categoryDTO) {
    try {
      const createdCategory = await Category.create(categoryDTO);
      return createdCategory;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAll() {
    try {
      const categories = await Category.findAll({});
      return categories;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getById(categoryId) {
    try {
      const category = await Category.findByPk(categoryId);
      return category;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newCategoryDTO, categoryDTO) {
    try {
      const updatedCategory = await Category.update(newCategoryDTO, { where: categoryDTO });
      return updatedCategory;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(categoryId) {
    try {
      const deletedCategory = await Category.destroy({ where: { categoryId } });
      return deletedCategory;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const categoryModel = new CategoryModel();

module.exports = { categoryModel };
