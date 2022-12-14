const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "group",
    {
      groupId: {
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "userId",
        },
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      timeLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      likedNum: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isComplete: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "group",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "groupId" },
            { name: "shopId" },
            { name: "categoryId" },
            { name: "userId" },
          ],
        },
        {
          name: "FK_Shop_TO_Group_1",
          using: "BTREE",
          fields: [{ name: "shopId" }],
        },
        {
          name: "FK_Shop_TO_Group_2",
          using: "BTREE",
          fields: [{ name: "categoryId" }],
        },
        {
          name: "FK_User_TO_Group_1",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
      ],
    }
  );
};
