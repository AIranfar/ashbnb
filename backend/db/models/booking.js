'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' })
      Booking.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Booking.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATEONLY
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
