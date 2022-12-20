const { pool } = require("../mysql-pool");
const o = new (require("../../util/build-query"))("user");

class UserModel {
  async create(userDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(userDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async get(userDTO, filterArr) {
    try {
      const whereArr = o.objToQueryArray(userDTO);
      const query = o.makeSelectQuery(filterArr, whereArr);
      console.log(query);

      const [user] = await pool.query(query);

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAll() {
    try {
      const query = o.makeSelectQuery();
      console.log(query);

      const [users] = await pool.query(query);
      return users;
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
      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(userId) {
    try {
      const where = o.objToQueryArray({ userId });
      const query = o.makeDeleteQuery(where);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const userModel = new UserModel();

module.exports = { userModel };
