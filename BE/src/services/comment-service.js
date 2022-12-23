const { commentModel } = require("../db/models");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class CommentService {
  constructor(commentModel) {
    this.commentModel = commentModel;
  }

  async create(commentDTO) {
    const result = await this.commentModel.create(commentDTO);
    return result;
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
    if (exComment.length === 0)
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 댓글이 없습니다.");

    const { userId } = newCommentDTO;
    const isByAuth = exComment[0].userId === userId;
    if (!isByAuth)
      throw new ErrorFactory(
        commonErrors.FORBIDDEN,
        403,
        "다른 유저의 댓글에 대한 권한이 없습니다."
      );

    const result = await this.commentModel.update(newCommentDTO, { commentId });
    return result;
  }

  async deleteByAuth(userId, commentId) {
    const exComment = await this.commentModel.getByCommentId(commentId);
    if (exComment.length === 0)
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 댓글이 없습니다.");
    const isByAuth = exComment[0].userId === userId;
    if (!isByAuth)
      throw new ErrorFactory(
        commonErrors.FORBIDDEN,
        403,
        "다른 유저의 댓글에 대한 권한이 없습니다."
      );
    const result = await this.commentModel.deleteById(commentId);
    return result;
  }

  async deleteByAdmin(commentId) {
    const exComment = await this.commentModel.getByCommentId(commentId);
    if (exComment.length === 0)
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 댓글이 없습니다.");
    const result = await this.commentModel.deleteById(commentId);
    return result;
  }
}

const commentService = new CommentService(commentModel);

module.exports = { commentService };
