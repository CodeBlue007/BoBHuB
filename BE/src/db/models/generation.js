const { pool } = require("../mysql-pool");
const buildQuery = require("../../util/build-query");
const tr = new buildQuery("track");
const o = new buildQuery("generation");

class GenerationModel {
  async create(eliceDTO) {
    const conn = await pool.getConnection();
    try {
      const { track } = eliceDTO;
      const trackKeyArr = ["track"];
      const trackValArr = [track];
      let trackQuery = tr.makeInsertQuery(trackKeyArr, trackValArr);
      trackQuery = trackQuery.slice(0, 6) + " ignore" + trackQuery.slice(6);
      console.log(trackQuery);

      const { keyArr, valArr } = o.objToKeyValueArray(eliceDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      console.log(query);

      await conn.beginTransaction();

      await pool.query(trackQuery);
      const [result2] = await pool.query(query);
      await conn.commit();

      return result2;
    } catch (err) {
      await conn.rollback();
      throw new Error(err);
    } finally {
      conn.release();
    }
  }

  async getAll() {
    try {
      const query = o.makeSelectQuery();
      console.log(query);

      const [elices] = await pool.query(query);
      return elices;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newGenerationDTO, generationDTO) {
    try {
      const newDTO = o.objToQueryArray(newGenerationDTO);
      const oldDTO = o.objToQueryArray(generationDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      console.log(query);
      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(eliceId) {
    try {
      const whereArr = o.objToQueryArray({ eliceId });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const generationModel = new GenerationModel();

module.exports = { generationModel };
