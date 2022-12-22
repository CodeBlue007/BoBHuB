const { commentModel } = require("../db/models");
const buildRes = require("../utils/build-response");
const { BadRequest, NotFound, Forbidden } = require("../utils/error-factory");

class CommentService {
  constructor(commentModel) {
    this.commentModel = commentModel;
  }

  async create(commentDTO) {
    try {
      const result = await this.commentModel.create(commentDTO);
      return buildRes("c", result);
    } catch {
      throw new BadRequest("Body에 작성한 내용에 오류가 있습니다.");
    }
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
    const exComment = await this.commentModel.getByCommentId(commentId);
    if (exComment.length === 0) {
      throw new NotFound("존재하는 댓글이 없습니다.");
    }

    const { userId } = newCommentDTO;
    const isByAuth = exComment[0].userId === userId;
    if (!isByAuth) {
      throw new Forbidden("다른 유저의 댓글에 대한 권한이 없습니다.");
    }

    try {
      const result = await this.commentModel.update(newCommentDTO, { commentId });
      return buildRes("u", result);
    } catch {
      throw new BadRequest("Body에 작성한 내용에 오류가 있습니다.");
    }
  }

  async deleteByAuth(userId, commentId) {
    const exComment = await this.commentModel.getByCommentId(commentId);
    if (exComment.length === 0) throw new NotFound("존재하는 댓글이 없습니다.");

    const isByAuth = exComment[0].userId === userId;
    if (!isByAuth) throw new Forbidden("다른 유저의 댓글에 대한 권한이 없습니다.");

    try {
      const result = await commentModel.deleteById(commentId);
      return buildRes("d", result);
    } catch {
      throw new BadRequest("Body에 작성한 내용에 오류가 있습니다.");
    }
  }

  async deleteByAdmin(commentId) {
    try {
      const result = await commentModel.deleteById(commentId);
      return buildRes("d", result);
    } catch {
      throw new NotFound("존재하는 댓글이 없습니다.");
    }
  }
}

const commentService = new CommentService(commentModel);

module.exports = { commentService };
