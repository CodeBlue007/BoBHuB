const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("track");
const { buildRes, logger } = require("../../utils");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class TrackModel {
  async create(eliceDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(eliceDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      logger.info(query);

      const [result] = await pool.query(query);
      return buildRes("c", result);
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async getById(track) {
    try {
      const whereArr = o.objToQueryArray({ track });
      const query = o.makeSelectQuery({ whereArr });
      logger.info(query);

      const [trackName] = await pool.query(query);
      return trackName;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async getAll() {
    try {
      const query = o.makeSelectQuery({});
      logger.info(query);

      const [tracks] = await pool.query(query);
      return tracks;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async update(newTrackDTO, trackDTO) {
    try {
      const newDTO = o.objToQueryArray(newTrackDTO);
      const oldDTO = o.objToQueryArray(trackDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      logger.info(query);

      const [result] = await pool.query(query);
      return buildRes("u", result);
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async deleteById(track) {
    try {
      const whereArr = o.objToQueryArray({ track });
      const query = o.makeDeleteQuery(whereArr);
      logger.info(query);

      const [result] = await pool.query(query);
      return buildRes("d", result);
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }
}

const trackModel = new TrackModel();

module.exports = { trackModel };
