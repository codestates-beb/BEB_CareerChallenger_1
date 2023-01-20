const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('concert', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    singer_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    place: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    performancePeriod: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ageLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'concert',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
