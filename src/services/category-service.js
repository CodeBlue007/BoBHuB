const { categoryModel } = require("../db/models");

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async create(categoryDTO) {
    const createdNewCategory = await this.categoryModel.create(categoryDTO);
    return createdNewCategory;
  }

  async getAll() {
    const categories = await this.categoryModel.getAll();
    return categories;
  }

  async getById(category) {
    const getCategory = await this.categoryModel.getById(category);
    return getCategory;
  }

  async update(category, oldCategory) {
    const result = await this.categoryModel.update({ category }, { category: oldCategory });
    if (result.changedRows === 0) {
      throw new Error(`Id:${category} 카테고리의 업데이트에 실패하였습니다`);
    }

    return { result: "success" };
  }

  async deleteById(category) {
    const deleteCount = await this.categoryModel.deleteById(category);
    if (deleteCount === 0) {
      throw new Error(`Id:${category} 카테고리의 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}

const categoryService = new CategoryService(categoryModel);

module.exports = { categoryService };
