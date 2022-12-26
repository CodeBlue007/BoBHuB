const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("party");
const buildRes = require("../../utils/build-response");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class PartyModel {
  async create(partyDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(partyDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      console.log(query);

      const [result] = await pool.query(query);
      return buildRes("c", result);
    } catch (err) {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }
  async getAll() {
    try {
      let query = o.makeSelectQuery();
      query += ` join(select name, shopPicture, menu, address ,shopId
        from shop) as s
        on s.shopId = party.shopId
        left join (SELECT shopId as Id1
          , AVG(star) AS avgStar
       FROM comment
      GROUP BY shopId) c on c.Id1 = party.shopId`;
      console.log(query);

      const [parties] = await pool.query(query);
      return parties;
    } catch (err) {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
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
      console.log(query);
      const [result] = await pool.query(query);
      return buildRes("u", result);
    } catch (err) {
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
      console.log(query);

      const [result] = await pool.query(query);
      return buildRes("d", result);
    } catch (err) {
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
