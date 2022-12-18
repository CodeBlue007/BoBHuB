const { commentModel } = require("../db/models");
const buildRes = require("../util/build-response");

class CommentService {
  constructor(commentModel) {
    this.commentModel = commentModel;
  }

  async create(commentDTO) {
    const result = await this.commentModel.create(commentDTO);
    return buildRes("c", result);
  }

  async getAll() {
    const comments = await this.commentModel.getAll();
    return comments;
  }

  async getByShopId(shopId) {
    const comments = await this.commentModel.getByShopId(shopId);
    return comments;
  }

  async update(newCommentDTO, commentId) {
    const result = await this.commentModel.update(newCommentDTO, { commentId });
    return buildRes("u", result);
  }

  async deleteById(commentId) {
    const result = await commentModel.deleteById(commentId);
    return buildRes("d", result);
  }
}

const commentService = new CommentService(commentModel);

module.exports = { commentService };
