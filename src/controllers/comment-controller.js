const { commentService } = require("../services");

class CommentController {
  async create(req, res, next) {
    try {
      const { content } = req.body;
      const star = parseInt(req.body.star);
      const shopId = parseInt(req.params.shopId);
      const userId = parseInt(req.user.userId);
      const result = await commentService.create({ shopId, userId, content, star });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getByShopId(req, res, next) {
    try {
      const shopId = parseInt(req.params.shopId);

      const commentList = await commentService.getByShopId(shopId);
      return res.status(200).json(commentList);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const commentList = await commentService.getAll();
      return res.status(200).json(commentList);
    } catch (e) {
      next(e);
    }
  }

  async updateAuth(req, res, next) {
    try {
      const { content } = req.body;
      const star = parseInt(req.body.star);
      const commentId = parseInt(req.params.commentId);
      const newCommentDTO = { content, star };
      const updatedComment = await commentService.update(newCommentDTO, commentId);

      return res.status(200).json(updatedComment);
    } catch (e) {
      next(e);
    }
  }

  async deleteAuth(req, res, next) {
    try {
      // const userId = parseInt(req.user.userId);
      // userId를 쓸 일이 없지 않나? 로그인이랑 session ID로 검증을 하는건데?
      const commentId = parseInt(req.params.commentId);
      const result = await commentService.deleteById(commentId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const commentId = parseInt(req.params.commentId);
      const result = await commentService.deleteById(commentId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const commentController = new CommentController();

module.exports = { commentController };
