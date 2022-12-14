const { commentService } = require("../services");

class CommentController {
  async create(req, res, next) {
    const { content, star } = req.body;
    try {
      const addedcomment = await commentService.create({
        content,
        star,
      });
      return res.status(200).json(addedcomment);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const commentList = await commentService.getById();
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
      const updatedcomment = await commentService.update(commentId, { content, star });

      return res.status(200).json(updatedcomment);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { commentId } = req.params;
      const deletedcomment = await commentService.delete(commentId);
      res.status(200).json(deletedcomment);
    } catch (e) {
      next(e);
    }
  }
}

const commentController = new CommentController();

module.exports = { commentController };
