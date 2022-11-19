const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class List extends Model {}

List.init({
  name: {
    type: DataTypes.TEXT
  },
  position: {
    type: DataTypes.INTEGER // Note: on autorise 2 listes à avoir la même position par simplicité
  }
}, {
  sequelize, // We need to pass the connection instance
  tableName: "list"
});

module.exports = List;
