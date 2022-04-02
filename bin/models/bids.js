'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.auctions, {
        foreignKey: "auction_id",
        as: "auctions"
      })

      this.belongsTo(models.citizens, {
        foreignKey: "citizen_id",
        as: "citizens"
      })
    }
  };
  bid.init({
    bid_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, 
    auction_id: DataTypes.INTEGER,
    citizen_id: DataTypes.INTEGER,
    bid_price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bids',
  });
  return bid;
};