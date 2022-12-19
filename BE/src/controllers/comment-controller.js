const { commentService } = require("../services");

class CommentController {
  async create(req, res, next) {
    try {
      const { content } = req.body;
      const star = parseInt(req.body.star);
      const shopId = parseInt(req.body.shopId);
      const userId = parseInt(req.user.userId);
      const result = await commentService.create({ shopId, userId, content, star });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getByShopId(req, res, next) {
    try {
      const shopId = parseInt(req.query.shopId);
      const commentList = await commentService.getByShopId(shopId);
      return res.status(200).json(commentList);
    } catch (e) {
      next(e);
    }
  }

  async getAllByAdmin(req, res, next) {
    try {
      const commentList = await commentService.getAllByAdmin();
      return res.status(200).json(commentList);
    } catch (e) {
      next(e);
    }
  }

  async updateByAuth(req, res, next) {
    try {
      const { content } = req.body;
      const { userId } = req.user;
      const star = parseInt(req.body.star);
      const commentId = parseInt(req.params.commentId);
      const newCommentDTO = { content, star, userId };
      const updatedComment = await commentService.updateByAuth(newCommentDTO, commentId);

      return res.status(200).json(updatedComment);
    } catch (e) {
      next(e);
    }
  }

  async deleteByAuth(req, res, next) {
    try {
      const { userId } = req.user;
      console.log(userId)
      const commentId = parseInt(req.params.commentId);
      const result = await commentService.deleteByAuth(userId, commentId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteByAdmin(req, res, next) {
    try {
      const commentId = parseInt(req.params.commentId);
      const result = await commentService.deleteByAdmin(commentId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const commentController = new CommentController();

module.exports = { commentController };
