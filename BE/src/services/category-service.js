const { categoryModel } = require("../db/models");
const buildRes = require("../utils/build-response");

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async create(categoryDTO) {
    const result = await this.categoryModel.create(categoryDTO);
    return buildRes("c", result);
  }

  async getAll() {
    const categories = await this.categoryModel.getAll();
    return categories;
  }

  async getById(category) {
    const getCategory = await this.categoryModel.getById(category);
    return getCategory;
  }

  async update(newCategory, category) {
    const result = await this.categoryModel.update({ category: newCategory }, { category });
    return buildRes("u", result);
  }

  async deleteById(category) {
    const result = await this.categoryModel.deleteById(category);
    return buildRes("d", result);
  }
}

const categoryService = new CategoryService(categoryModel);

module.exports = { categoryService };
