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

  async getAllByAdmin() {
    const comments = await this.commentModel.getAll();

    return comments;
  }

  async getByShopId(shopId) {
    const comments = await this.commentModel.getByShopId(shopId);
    return comments;
  }

  async updateByAuth(newCommentDTO, commentId) {
    const { userId } = newCommentDTO;

    const currentComment = await this.commentModel.getByCommentId(commentId);
    const isByAuth = currentComment.userId === userId;
    if (!isByAuth) throw new Error("권한이 없습니다.");

    const result = await this.commentModel.update(newCommentDTO, { commentId });
    return buildRes("u", result);
  }

  async deleteByAuth(userId, commentId) {
    const currentComment = await this.commentModel.getByCommentId(commentId);
    const isByAuth = currentComment.userId === userId;
    if (!isByAuth) throw new Error("권한이 없습니다.");

    const result = await commentModel.deleteById(commentId);
    return buildRes("d", result);
  }

  async deleteByAdmin(commentId) {
    const result = await commentModel.deleteById(commentId);
    return buildRes("d", result);
  }
}

const commentService = new CommentService(commentModel);

module.exports = { commentService };
