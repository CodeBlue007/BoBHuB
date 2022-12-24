const { categoryModel } = require("../db/models");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async create(categoryDTO) {
    const checkCategory = await this.categoryModel.getById(categoryDTO.category);
    if (checkCategory.length !== 0) {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "같은 이름의 카테고리가 이미 존재합니다."
      );
    }
    const result = await this.categoryModel.create(categoryDTO);
    return result;
  }

  async getAll() {
    const categories = await this.categoryModel.getAll();
    return categories;
  }

  async update(newCategory, category) {
    const checkExCategory = await this.categoryModel.getById(category);
    if (checkExCategory.length === 0) {
      throw new ErrorFactory(
        commonErrors.NOT_FOUND,
        404,
        "수정할 카테고리가 존재하지 않습니다."
      );
    }
    const checkNewCategory = await this.categoryModel.getById(newCategory);
    if (checkNewCategory.length !== 0) {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "같은 이름의 카테고리가 이미 존재합니다."
      );
    }
    const result = await this.categoryModel.update({ category: newCategory }, { category });
    return result;
  }

  async deleteById(category) {
    const checkExCategory = await this.categoryModel.getById(category);
    if (checkExCategory.length === 0) {
      throw new ErrorFactory(
        commonErrors.NOT_FOUND,
        404,
        "수정할 카테고리가 존재하지 않습니다."
      );
    }
    const result = await this.categoryModel.deleteById(category);
    return result;
  }
}

const categoryService = new CategoryService(categoryModel);

module.exports = { categoryService };
