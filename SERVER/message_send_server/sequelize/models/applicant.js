const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('applicant', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0"
    },
    time: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'applicant',
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
