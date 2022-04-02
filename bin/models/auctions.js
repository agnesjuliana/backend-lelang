'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auctions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.items, {
        foreignKey: "item_id",
        as: "items"
      })

      this.belongsTo(models.officers, {
        foreignKey: "officer_id",
        as: "officers"
      })

      this.hasMany(models.bids, {
        foreignKey: "auction_id",
        as: "bids"
      })
    }
  };
  auctions.init({
    auction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, 
    item_id: DataTypes.INTEGER,
    officer_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    final_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'auctions',
  });
  return auctions;
};