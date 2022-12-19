const { pool } = require("../mysql-pool");
const o = new (require("../../util/build-query"))("comment");

class CommentModel {
  async create(commentDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(commentDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAll() {
    try {
      const query = o.makeSelectQuery();
      console.log(query);
      const [comments] = await pool.query(query);
      return comments;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByShopId(shopId) {
    try {
      const whereArr = o.objToQueryArray({ shopId });
      const query = o.makeSelectQuery(undefined, whereArr);
      console.log(query);

      const [comments] = await pool.query(query);
      return comments;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByCommentId(commentId) {
    try {
      const whereArr = o.objToQueryArray({ commentId });
      const query = o.makeSelectQuery(undefined, whereArr);
      console.log(query);

      const [comment] = await pool.query(query);
      return comment;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newCommentDTO, commentDTO) {
    try {
      const newDTO = o.objToQueryArray(newCommentDTO);
      const oldDTO = o.objToQueryArray(commentDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);

      console.log(query);
      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(commentId) {
    try {
      const whereArr = o.objToQueryArray({ commentId });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const commentModel = new CommentModel();

module.exports = { commentModel };
