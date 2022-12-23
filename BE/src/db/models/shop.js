const { pool } = require("../mysql-pool");
const o = new (require("../../utils/build-query"))("shop");

class ShopModel {
  async count(req, res, next) {
    const query = o.makeCountQuery();
    console.log(query);

    const [countData] = await pool.query(query);
    return countData[0];
  }
  async create(shopDTO) {
    try {
      const { keyArr, valArr } = o.objToKeyValueArray(shopDTO);
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
      console.log(query);

      const [shops] = await pool.query(query);
      return shops;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByShopId(shopId) {
    try {
      const whereArr = o.objToQueryArray({ shopId });
      const query = o.makeSelectQuery(undefined, whereArr);
      console.log(query);

      const [shop] = await pool.query(query);
      return shop[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(newShopDTO, shopDTO) {
    try {
      const newDTO = o.objToQueryArray(newShopDTO);
      const oldDTO = o.objToQueryArray(shopDTO);
      const query = o.makeUpdateQuery(newDTO, oldDTO);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(shopId) {
    try {
      const whereArr = o.objToQueryArray({ shopId });
      const query = o.makeDeleteQuery(whereArr);
      console.log(query);

      const [result] = await pool.query(query);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const shopModel = new ShopModel();

module.exports = { shopModel };
