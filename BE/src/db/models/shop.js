const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("shop");
const { buildRes, logger } = require("../../utils");
const { ErrorFactory, commonErrors } = require("../../utils/error-factory");

class ShopModel {
  async count(req, res, next) {
    try {
      const query = o.makeCountQuery();
      logger.info(query);

      const [countData] = await pool.query(query);
      return countData[0];
    } catch {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }
  async create(shopDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(shopDTO);
      const query = o.makeInsertQuery(keyArr, valArr);
      logger.info(query);
      const [result] = await pool.query(query);
      return buildRes("c", result);
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
      let query = `select shopId, category, name, distance, address, menu, shopPicture, description, createdAt, food, avgStar
      from shop s
      left join(select shopId as id1
        , JSON_ARRAYAGG(JSON_OBJECT('name', name, 'picture', picture ,'price',price)) as food
      from food
      group by shopId) as f
      on s.shopId = f.id1
      left join (SELECT shopId as id2
        , AVG(star) AS avgStar
     FROM comment
    GROUP BY shopId) c on s.shopId = c.id2;
    `;

      logger.info(query);

      const [shops] = await pool.query(query);

      return shops;
    } catch {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async getByShopId(shopId) {
    try {
      const whereArr = o.objToQueryArray({ shopId });
      const query = o.makeSelectQuery({ whereArr });
      logger.info(query);

      const [shop] = await pool.query(query);
      return shop[0];
    } catch {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async getByShopName(name) {
    try {
      const whereArr = o.objToQueryArray({ name });
      const query = o.makeSelectQuery({ whereArr });
      logger.info(query);

      const [shop] = await pool.query(query);
      return shop[0];
    } catch {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async update(newShopDTO, shopDTO) {
    try {
      const newDTO = o.objToQueryArray(newShopDTO);
      const oldDTO = o.objToQueryArray(shopDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      logger.info(query);

      const [result] = await pool.query(query);
      return buildRes("u", result);
    } catch {
      throw new ErrorFactory(
        commonErrors.DB_ERROR,
        500,
        "요청한 내용으로 DB에서 처리할 수 없습니다."
      );
    }
  }

  async deleteById(shopId) {
    try {
      const whereArr = o.objToQueryArray({ shopId });
      const query = o.makeDeleteQuery(whereArr);
      logger.info(query);

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

const shopModel = new ShopModel();

module.exports = { shopModel };
