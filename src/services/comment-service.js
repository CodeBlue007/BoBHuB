const { commentModel } = require("../db");

class CommentService {
  constructor(commentModel) {
    this.commentModel = commentModel;
  }

  async create(commentInfo) {
      const createdcomment = await this.commentModel.create(commentInfo);
      return createdcomment;
  }

  async getAll() {
    const comments = await this.commentModel.getAll();
    return comments;
  }
// 넘어가는 결과 객체 table에서 제대로 되는지 확인해야함.
  async getById(shopId) {
    const comments = await this.commentModel.getById({ _id: shopId });
    return comments;
  }

  async update(commentId, content) {
    
  }

  async delete(commentId) {
    await commentModel.deleteById({commentId});
  }
}

const commentService = new CommentService(commentModel);

module.exports = { commentService };