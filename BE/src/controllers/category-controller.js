const { categoryService } = require("../services");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class CategoryController {
  async create(req, res, next) {
    const { category } = req.body;
    try {
      const result = await categoryService.create({
        category,
      });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const categoryList = await categoryService.getAll();
      return res.status(200).json(categoryList);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { newCategory, category } = req.body;
      if (newCategory === category) {
        throw new ErrorFactory(
          commonErrors.BAD_REQUEST,
          400,
          "수정할 카테고리와 기존 카테고리의 이름이 동일합니다."
        );
      }
      const result = await categoryService.update(newCategory, category);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { category } = req.body;
      const result = await categoryService.deleteById(category);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const categoryController = new CategoryController();

module.exports = { categoryController };
