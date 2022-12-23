const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("track");

class TrackModel {
  async create(eliceDTO) {
    const { keyArr, valArr } = o.objToKeyValueArray(eliceDTO);
    const query = o.makeInsertQuery(keyArr, valArr);
    console.log(query);

    const [result] = await pool.query(query, console.log(query));
    return result;
  }

  async getById(track) {
    const whereArr = o.objToQueryArray({ track });
    const query = o.makeSelectQuery(undefined, whereArr);
    console.log(query);

    const [trackName] = await pool.query(query);
    return trackName;
  }

  async getAll() {
    const query = o.makeSelectQuery();
    console.log(query);

    const [tracks] = await pool.query(query);
    return tracks;
  }

  async update(newTrackDTO, trackDTO) {
    const newDTO = o.objToQueryArray(newTrackDTO);
    const oldDTO = o.objToQueryArray(trackDTO);
    const query = o.makeUpdateQuery(newDTO, oldDTO);
    console.log(query);

    const [result] = await pool.query(query);
    return result;
  }

  async deleteById(track) {
    const whereArr = o.objToQueryArray({ track });
    const query = o.makeDeleteQuery(whereArr);
    console.log(query);

    const [result] = await pool.query(query);
    return result;
  }
}

const trackModel = new TrackModel();

module.exports = { trackModel };
