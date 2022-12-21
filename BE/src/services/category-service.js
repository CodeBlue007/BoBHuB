const { categoryModel } = require("../db/models");
const buildRes = require("../utils/build-response");
const { BadRequest, NotFound } = require("../utils/error-factory");

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async create(categoryDTO) {
    try {
      const result = await this.categoryModel.create(categoryDTO);
      return buildRes("c", result);
    } catch {
      throw new BadRequest("같은 이름의 카테고리가 이미 존재합니다.");
    }
  }

  async getAll() {
    const categories = await this.categoryModel.getAll();
    return categories;
  }

  async update(newCategory, category) {
    if (newCategory === category) {
      throw new BadRequest("수정할 카테고리와 기존 카테고리의 이름이 동일합니다.");
    }

    const exCategory = await this.categoryModel.getById(category);
    if (exCategory.length === 0) {
      throw new NotFound("존재하는 카테고리가 없습니다.");
    }

    try {
      const result = await this.categoryModel.update({ category: newCategory }, { category });
      return buildRes("u", result);
    } catch {
      throw new BadRequest("수정할 이름의 카테고리가 이미 존재합니다.");
    }
  }

  async deleteById(category) {
    try {
      const result = await this.categoryModel.deleteById(category);
      return buildRes("d", result);
    } catch {
      throw new NotFound("존재하는 카테고리가 없습니다.");
    }
  }
}

const categoryService = new CategoryService(categoryModel);

module.exports = { categoryService };
