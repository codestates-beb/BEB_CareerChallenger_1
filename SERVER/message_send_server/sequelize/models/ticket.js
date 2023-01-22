const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticket', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    concert_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'concert',
        key: 'id'
      }
    },
    performanceTime: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ticket',
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
      {
        name: "FK__concert",
        using: "BTREE",
        fields: [
          { name: "concert_id" },
        ]
      },
    ]
  });
};
