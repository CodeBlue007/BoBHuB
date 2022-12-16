const { pool } = require("../mysql-pool");
const o = new (require("../../util/make-query"))("user");

class UserModel {
  async create(userDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(userDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      const [result] = await pool.query(query, console.log(query));
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByUserId(userId) {
    try {
      const whereArr = o.objToQueryArray({ userId });
      const query = o.makeSelectQuery(undefined, whereArr);
      console.log(query);

      const result = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newUserDTO, userDTO) {
    try {
      const newDTO = o.objToQueryArray(newUserDTO);
      const oldDTO = o.objToQueryArray(userDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      console.log(query);
      const [updatedUser] = await pool.query(query);
      return updatedUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(userId) {
    try {
      const where = o.objToQueryArray({ userId });
      const query = o.makeDeleteQuery(where);
      console.log(query);

      const deletedUser = await pool.query(query);
      return deletedUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const userModel = new UserModel();

module.exports = { userModel };
