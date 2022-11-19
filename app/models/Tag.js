const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Tag extends Model {}

Tag.init({
  name: {
    type: DataTypes.TEXT
  },
  color: {
    type: DataTypes.TEXT // On pourrait par exemple raffiner en mettant une regex
  }
}, {
  sequelize, // We need to pass the connection instance
  tableName: "tag"
});

module.exports = Tag;
