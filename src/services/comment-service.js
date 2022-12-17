const { commentModel } = require("../db/models");

class CommentService {
  constructor(commentModel) {
    this.commentModel = commentModel;
  }

  async create(commentInfo) {
    const createdComment = await this.commentModel.create(commentInfo);
    return createdComment;
  }

  async getAll() {
    const comments = await this.commentModel.getAll();
    return comments;
  }
  // 넘어가는 결과 객체 table에서 제대로 되는지 확인해야함.
  async getByShopId(shopId) {
    const comments = await this.commentModel.getById(shopId);
    return comments;
  }

  async update(newCommentDTO, commentId) {
    const comment = await this.commentModel.update(newCommentDTO, { commentId });

    return comment;
  }

  async deleteById(commentId) {
    await commentModel.deleteById(commentId);
  }
}

const commentService = new CommentService(commentModel);

module.exports = { commentService };
