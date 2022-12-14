const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "comment",
    {
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: 1,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "userId",
        },
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
      content: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "comment",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "commentId" }, { name: "userId" }, { name: "shopId" }],
        },
        {
          name: "FK_User_TO_Comment_1",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
        {
          name: "FK_Shop_TO_Comment_1",
          using: "BTREE",
          fields: [{ name: "shopId" }],
        },
      ],
    }
  );
};
