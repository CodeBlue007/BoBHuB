const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: 1,

        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      profile: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      status: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
      ],
    }
  );
};
