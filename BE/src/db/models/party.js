const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("party");
const { buildRes, logger } = require("../../utils");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class PartyModel {
  async create(partyDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(partyDTO);
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
  async getAll() {
    try {
      let query = o.makeSelectQuery({});
      query += ` join(select name, shopPicture, menu, address ,shopId
        from shop) as s
        on s.shopId = party.shopId
        left join (SELECT shopId as Id1
          , AVG(star) AS avgStar
       FROM comment
      GROUP BY shopId) c on c.Id1 = party.shopId`;
      logger.info(query);

      const [parties] = await pool.query(query);
      return parties;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async get(partyDTO) {
    try {
      const whereArr = o.objToQueryArray(partyDTO);
      const query = o.makeSelectQuery({ whereArr });
      logger.info(query);

      const [parties] = await pool.query(query);
      return parties;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async update(newPartyDTO, partyDTO) {
    try {
      const newDTO = o.objToQueryArray(newPartyDTO);
      const oldDTO = o.objToQueryArray(partyDTO);
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

  async deleteById(partyId) {
    try {
      const whereArr = o.objToQueryArray({ partyId });
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

const partyModel = new PartyModel();

module.exports = { partyModel };
