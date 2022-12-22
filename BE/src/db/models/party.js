const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("party");

class PartyModel {
  async create(partyDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(partyDTO);
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

      const [parties] = await pool.query(query);
      return parties;
    } catch (err) {
      throw new Error(err);
    }
  }

  async get(partyDTO) {
    try {
      console.log(partyDTO);
      const whereArr = o.objToQueryArray(partyDTO);
      const query = o.makeSelectQuery(undefined, whereArr);
      console.log(query);

      const [parties] = await pool.query(query);
      return parties;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newPartyDTO, partyDTO) {
    try {
      const newDTO = o.objToQueryArray(newPartyDTO);
      const oldDTO = o.objToQueryArray(partyDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      console.log(query);
      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(partyId) {
    try {
      const whereArr = o.objToQueryArray({ partyId });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const partyModel = new PartyModel();

module.exports = { partyModel };
