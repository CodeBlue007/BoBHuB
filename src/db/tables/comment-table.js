const db = require("../models");
const comment = db.comment;

export class CommentModel {
  async create(commentInfo) {
    try {
      const createdcomment = await comment.create(commentInfo);
      return createdcomment;
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

  async getById(id) {
    try {
      const comment = await comment.findByPk(id);
      return comment;
    } catch (err) {
      throw new Error(err);
    }
  }
// 형식이 아예 바뀌었으니 update 로직도 바뀌어야 할듯? 일단 유지해서 ㅇㅇ
  async update(filterObj, updateObj) {
    try {
      const updatedcomment = await comment.update(updateObj, { where: filterObj });
      return updatedcomment;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(commentId) {
    try {
      const deletedcomment = await comment.destroy({ where: { commentId } });
      return deletedcomment;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const commentModel = new CommentModel();

module.exports = { commentModel };
