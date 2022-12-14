const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "shop",
    {
      shopId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "category",
          key: "categoryId",
        },
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      menu: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      shopPicture: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "shop",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "shopId" }, { name: "categoryId" }],
        },
        {
          name: "FK_Category_TO_Shop_1",
          using: "BTREE",
          fields: [{ name: "categoryId" }],
        },
      ],
    }
  );
};
