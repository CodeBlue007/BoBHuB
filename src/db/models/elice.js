const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "elice",
    {
      eliceId: {
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
      track: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      generation: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "elice",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "eliceId" }, { name: "userId" }],
        },
        {
          name: "FK_User_TO_Elice_1",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
      ],
    }
  );
};
