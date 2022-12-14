const { categoryService } = require("../services");

class CategoryController {
  async addCategory(req, res, next) {
    const { name } = req.body;
    try {
      const addedCategory = await categoryService.addCategory({
        name,
      });
      return res.status(200).json(addedCategory);
    } catch (e) {
      next(e);
    }
  }

  async getCategoryList(req, res, next) {
    try {
      const categoryList = await categoryService.getCategoryList();
      return res.status(200).json(categoryList);
    } catch (e) {
      next(e);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;
      const updatedCategory = await categoryService.updateCategory(categoryId, name);

      return res.status(200).json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const deletedCategory = await categoryService.deleteCategory(categoryId);
      res.status(200).json(deletedCategory);
    } catch (e) {
      next(e);
    }
  }
}

const categoryController = new CategoryController();

module.exports = { categoryController };
