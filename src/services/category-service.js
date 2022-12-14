const { categoryModel } = require("../db");

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async create(categoryInfo) {
    console.log(categoryInfo);

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
    const category = await this.categoryModel.update(newCategoryDTO, { categoryId });

    return category;
  }

  async deleteById(categoryId) {
    let category = await this.categoryModel.deleteById(categoryId);
    // if (!category) {
    //   throw new NotFound("This Category Not in DB", 4403);
    // }

    // // "없음" 카테고리 있는지
    // let noneCategoryCheck = await this.categoryModel.totalCount({ name: "없음" });

    // // 있으면 상품id 추가후 삭제
    // if (noneCategoryCheck > 0) {
    //   const categoryUpdateObj = { $push: { products: { $each: productIdArr } } };
    //   const noneCategory = await this.categoryModel.update(
    //     { name: "없음" },
    //     categoryUpdateObj
    //   );

    //   await this.categoryModel.delete({ categoryId });

    //   return noneCategory;
    // } else {
    //   // 없으면 카테고리 이름을 없음으로 변경
    //   const noneCategory = await this.categoryModel.update(
    //     { _id: categoryId },
    //     { name: "없음" }
    //   );
    //   return noneCategory;
    // }
  }
}

const categoryService = new CategoryService(categoryModel);

module.exports = { categoryService };
