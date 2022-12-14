const db = require("../models");
const Category = db.category;

export class CategoryModel {
  async totalCount(filterObj) {
    const totalCount = await Category.findAndCountAll({ where: filterObj });
    return totalCount;
  }

  async create(categoryInfo) {
    try {
      const createdCategory = await Category.create(categoryInfo);
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

  async update(filterObj, updateObj) {
    try {
      const updatedCategory = await Category.update(updateObj, { where: filterObj });
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
