const db = require("../models");
const comment = db.comment;

export class CommentModel {
  async create(commentDTO) {
    try {
      const createdComment = await comment.create(commentDTO);
      return createdComment;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAll() {
    try {
      const comments = await comment.findAll({});
      return comments;
    } catch (err) {
      throw new Error(err);
    }
  }
// id로 참조하는 모든 id를 받게 할 것? 오류가 없다면
  async getById(id) {
    try {
      const comments = await comment.findByPk(id);
      return comments;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newCommentDTO, commentDTO) {
    try {
      const updatedComment = await comment.update(newCommentDTO, { where: commentDTO });
      return updatedComment;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(commentId) {
    try {
      const deletedComment = await comment.destroy({ where: { commentId } });C
      return deletedComment;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const commentModel = new CommentModel();

module.exports = { commentModel };
