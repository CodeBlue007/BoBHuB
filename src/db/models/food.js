const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "food",
    {
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      shopId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "shop",
          key: "shopId",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "shop",
          key: "categoryId",
        },
      },
      picture: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "food",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "foodId" }, { name: "shopId" }, { name: "categoryId" }],
        },
        {
          name: "FK_Shop_TO_Food_1",
          using: "BTREE",
          fields: [{ name: "shopId" }],
        },
        {
          name: "FK_Shop_TO_Food_2",
          using: "BTREE",
          fields: [{ name: "categoryId" }],
        },
      ],
    }
  );
};
