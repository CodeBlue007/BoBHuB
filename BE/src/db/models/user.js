const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("user");

class UserModel {
  async create(userDTO) {
    const { keyArr, valArr } = o.objToKeyValueArray(userDTO);
    const query = o.makeInsertQuery(keyArr, valArr);
    console.log(query);

    const [result] = await pool.query(query);
    return result;
  }

  async get(userDTO, filterArr) {
    const whereArr = o.objToQueryArray(userDTO);
    const query = o.makeSelectQuery(filterArr, whereArr);
    console.log(query);

    const [user] = await pool.query(query);

    return user;
  }

  async getAll() {
    const query = o.makeSelectQuery();
    console.log(query);

    const [users] = await pool.query(query);
    return users;
  }

  async update(newUserDTO, userDTO) {
    const newDTO = o.objToQueryArray(newUserDTO);
    const oldDTO = o.objToQueryArray(userDTO);
    const query = o.makeUpdateQuery(newDTO, oldDTO);
    console.log(query);
    const [result] = await pool.query(query);
    return result;
  }

  async deleteById(userId) {
    const where = o.objToQueryArray({ userId });
    const query = o.makeDeleteQuery(where);
    console.log(query);

    const [result] = await pool.query(query);
    return result;
  }
}

const userModel = new UserModel();

module.exports = { userModel };
