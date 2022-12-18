const { pool } = require("../mysql-pool");
const o = new (require("../../util/build-query"))("track");

class TrackModel {
  async create(eliceDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(eliceDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      console.log(query);

      const [result] = await pool.query(query, console.log(query));
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAll() {
    try {
      const query = o.makeSelectQuery();
      console.log(query);

      const [tracks] = await pool.query(query);
      return tracks;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newTrackDTO, trackDTO) {
    try {
      const newDTO = o.objToQueryArray(newTrackDTO);
      const oldDTO = o.objToQueryArray(trackDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(track) {
    try {
      const whereArr = o.objToQueryArray({ track });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const trackModel = new TrackModel();

module.exports = { trackModel };
