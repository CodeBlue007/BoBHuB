const { commentModel } = require("../db/models");

class CommentService {
  constructor(commentModel) {
    this.commentModel = commentModel;
  }

  async create(commentDTO) {
    const result = await this.commentModel.create(commentDTO);
    return result;
  }

  async getAll() {
    const comments = await this.commentModel.getAll();
    return comments;
  }

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
