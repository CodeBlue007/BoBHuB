const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "pick",
    {
      pickId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "group",
          key: "groupId",
        },
      },
    },
    {
      sequelize,
      tableName: "pick",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "pickId" }, { name: "userId" }, { name: "groupId" }],
        },
        {
          name: "FK_User_TO_Pick_1",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
        {
          name: "FK_Group_TO_Pick_1",
          using: "BTREE",
          fields: [{ name: "groupId" }],
        },
      ],
    }
  );
};
