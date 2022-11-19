const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Card extends Model {}

Card.init({
  content: {
    type: DataTypes.TEXT
  },
  position: {
    type: DataTypes.INTEGER // Note: on autorise 2 cards à avoir la même position par simplicité
  },
  color: {
    type: DataTypes.TEXT // On pourrait par exemple raffiner en mettant une regex
  }
}, {
  sequelize, // We need to pass the connection instance
  tableName: "card"
});

module.exports = Card;
