const { pool } = require("../mysql-pool");
const buildQuery = require("../../utils/build-query");
const tr = new buildQuery("track");
const o = new buildQuery("generation");
const buildRes = require("../../utils/build-response");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

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

      return buildRes("c", result2);
    } catch (err) {
      await conn.rollback();
      // 잘 되는지?
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "이미 작성한 내역이 있는 식당이거나 Body의 요청 내용이 잘못되었습니다."
      );
    } finally {
      conn.release();
    }
  }

  async getById(eliceId) {
    try {
      const whereArr = o.objToQueryArray({ eliceId });
      const query = o.makeSelectQuery({ whereArr });
      console.log(query);

      const [generationName] = await pool.query(query);
      return generationName;
    } catch {
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
      console.log(query);

      const [elices] = await pool.query(query);
      return elices;
    } catch {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async update(newGenerationDTO, generationDTO) {
    try {
      const newDTO = o.objToQueryArray(newGenerationDTO);
      const oldDTO = o.objToQueryArray(generationDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      console.log(query);
      const [result] = await pool.query(query);
      return buildRes("u", result);
    } catch {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "해당하는 트랙의 기수가 이미 존재하거나 Body의 요청 내용이 잘못되었습니다."
      );
    }
  }

  async deleteById(eliceId) {
    try {
      const whereArr = o.objToQueryArray({ eliceId });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const [result] = await pool.query(query);
      return buildRes("d", result);
    } catch {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }
}

const generationModel = new GenerationModel();

module.exports = { generationModel };
