const { commentService } = require("../services");

class CommentController {
  async create(req, res, next) {
    const { content, star } = req.body;
    try {
      const addedComment = await commentService.create({
        content,
        star,
      });
      return res.status(200).json(addedComment);
    } catch (e) {
      next(e);
    }
  }

  async getByShopId(req, res, next) {
    try {
      const { shopId } = req.params;
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

  async update(req, res, next) {
    try {
      const { commentId } = req.params;
      const { content, star } = req.body;
      const newCommentDTO = { content, star }
      const updatedComment = await commentService.update(newCommentDTO, commentId);

      return res.status(200).json(updatedComment);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { commentId } = req.params;
      const deletedComment = await commentService.deleteById(commentId);
      res.status(200).json(deletedComment);
    } catch (e) {
      next(e);
    }
  }
}

const commentController = new CommentController();

module.exports = { commentController };
