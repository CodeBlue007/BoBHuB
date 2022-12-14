const { categoryModel } = require("../db");

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async create(categoryInfo) {
    const createdNewCategory = await this.categoryModel.create(categoryInfo);
    return createdNewCategory;
  }

  async getAll() {
    const categories = await this.categoryModel.getAll();
    return categories;
  }

  async getById(categoryId) {
    const category = await this.categoryModel.getById(categoryId);
    return category;
  }

  async update(name, categoryId) {
    const newCategoryDTO = { name };
    const [updateCount] = await this.categoryModel.update(newCategoryDTO, { categoryId });

    if (updateCount === 0) {
      throw new Error(`Id:${categoryId} 카테고리의 업데이트에 실패하였습니다`);
    }

    return { result: "success" };
  }

  async deleteById(categoryId) {
    const deleteCount = await this.categoryModel.deleteById(categoryId);
    if (deleteCount === 0) {
      throw new Error(`Id:${categoryId} 카테고리의 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}

const categoryService = new CategoryService(categoryModel);

module.exports = { categoryService };
