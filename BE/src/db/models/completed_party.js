const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("completed_party");
const { buildRes, logger } = require("../../utils");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class CpModel {
  async getAll() {
    try {
      const query = o.makeSelectQuery({});
      logger.info(query);

      const [cps] = await pool.query(query);
      return cps;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async get(cpDTO) {
    try {
      const whereArr = o.objToQueryArray(cpDTO);
      const query = o.makeSelectQuery({ whereArr });
      logger.info(query);

      const [completedParty] = await pool.query(query);

      return completedParty;
    } catch (e) {
      logger.error(e);
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async deleteCompletedParty(partyId) {
    const conn = await pool.getConnection();
    try {
      const deleteCpQuery = `delete from completed_party where partyId = ?`;
      const deletePartyQuery = `delete from party where partyId = ?`;

      await conn.beginTransaction();
      const [deleteCp] = await conn.query(deleteCpQuery, [partyId]);
      const [deleteParty] = await conn.query(deletePartyQuery, [partyId]);

      await conn.commit();
      return buildRes("d", deleteParty);
    } catch (e) {
      logger.error(e);
      await conn.rollback();

      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    } finally {
      conn.release();
    }
  }
}

const cpModel = new CpModel();

module.exports = { cpModel };
