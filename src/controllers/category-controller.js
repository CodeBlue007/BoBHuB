const { categoryService } = require("../services");

class CategoryController {
  async create(req, res, next) {
    const { category } = req.body;
    try {
      const addedCategory = await categoryService.create({
        category,
      });
      return res.status(200).json(addedCategory);
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
      const { oldCategory, category } = req.body;
      const result = await categoryService.update(category, oldCategory);

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
