var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _comment = require("./comment");
var _elice = require("./elice");
var _food = require("./food");
var _group = require("./group");
var _pick = require("./pick");
var _shop = require("./shop");
var _user = require("./user");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var elice = _elice(sequelize, DataTypes);
  var food = _food(sequelize, DataTypes);
  var group = _group(sequelize, DataTypes);
  var pick = _pick(sequelize, DataTypes);
  var shop = _shop(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  // 관계 정의
  group.belongsToMany(user, {
    as: "userId_user_picks",
    through: pick,
    foreignKey: "groupId",
    otherKey: "userId",
  });
  shop.belongsToMany(shop, {
    as: "categoryId_shops",
    through: food,
    foreignKey: "shopId",
    otherKey: "categoryId",
  });
  shop.belongsToMany(shop, {
    as: "shopId_shop_foods",
    through: food,
    foreignKey: "categoryId",
    otherKey: "shopId",
  });
  shop.belongsToMany(user, {
    as: "userId_users",
    through: comment,
    foreignKey: "shopId",
    otherKey: "userId",
  });
  user.belongsToMany(group, {
    as: "groupId_groups",
    through: pick,
    foreignKey: "userId",
    otherKey: "groupId",
  });
  user.belongsToMany(shop, {
    as: "shopId_shops",
    through: comment,
    foreignKey: "userId",
    otherKey: "shopId",
  });
  shop.belongsTo(category, { as: "category", foreignKey: "categoryId" });
  category.hasMany(shop, { as: "shops", foreignKey: "categoryId" });
  pick.belongsTo(group, { as: "group", foreignKey: "groupId" });
  group.hasMany(pick, { as: "picks", foreignKey: "groupId" });
  comment.belongsTo(shop, { as: "shop", foreignKey: "shopId" });
  shop.hasMany(comment, { as: "comments", foreignKey: "shopId" });
  food.belongsTo(shop, { as: "shop", foreignKey: "shopId" });
  shop.hasMany(food, { as: "foods", foreignKey: "shopId" });
  food.belongsTo(shop, { as: "category", foreignKey: "categoryId" });
  shop.hasMany(food, { as: "category_foods", foreignKey: "categoryId" });
  group.belongsTo(shop, { as: "shop", foreignKey: "shopId" });
  shop.hasMany(group, { as: "groups", foreignKey: "shopId" });
  group.belongsTo(shop, { as: "category", foreignKey: "categoryId" });
  shop.hasMany(group, { as: "category_groups", foreignKey: "categoryId" });
  comment.belongsTo(user, { as: "user", foreignKey: "userId" });
  user.hasMany(comment, { as: "comments", foreignKey: "userId" });
  elice.belongsTo(user, { as: "user", foreignKey: "userId" });
  user.hasMany(elice, { as: "elice", foreignKey: "userId" });
  group.belongsTo(user, { as: "user", foreignKey: "userId" });
  user.hasMany(group, { as: "groups", foreignKey: "userId" });
  pick.belongsTo(user, { as: "user", foreignKey: "userId" });
  user.hasMany(pick, { as: "picks", foreignKey: "userId" });

  return {
    category,
    comment,
    elice,
    food,
    group,
    pick,
    shop,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
