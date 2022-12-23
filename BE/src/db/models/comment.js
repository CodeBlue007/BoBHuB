const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("comment");

class CommentModel {
  async create(commentDTO) {
    const { keyArr, valArr } = o.objToKeyValueArray(commentDTO);
    const query = o.makeInsertQuery(keyArr, valArr);
    console.log(query);

    const [result] = await pool.query(query);
    return result;
  }

  async getAll() {
    const query = o.makeSelectQuery();
    console.log(query);
    const [comments] = await pool.query(query);
    return comments;
  }

  async getByShopId(shopId) {
    try {
      const query = `select * from comment join (SELECT userId
        , nickname, profile
     FROM user ) u on u.userId = comment.userId  where shopId = ?`;

      console.log(query);

      const [comments] = await pool.query(query, [shopId]);
      return comments;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByCommentId(commentId) {
    const whereArr = o.objToQueryArray({ commentId });
    const query = o.makeSelectQuery(undefined, whereArr);
    console.log(query);

    const [comment] = await pool.query(query);
    return comment;
  }

  async update(newCommentDTO, commentDTO) {
    const newDTO = o.objToQueryArray(newCommentDTO);
    const oldDTO = o.objToQueryArray(commentDTO);
    const query = o.makeUpdateQuery(newDTO, oldDTO);

    console.log(query);
    const [result] = await pool.query(query);
    return result;
  }

  async deleteById(commentId) {
    const whereArr = o.objToQueryArray({ commentId });
    const query = o.makeDeleteQuery(whereArr);
    console.log(query);

    const [result] = await pool.query(query);
    return result;
  }
}

const commentModel = new CommentModel();

module.exports = { commentModel };
