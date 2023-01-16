var DataTypes = require("sequelize").DataTypes;
var _concert = require("./concert");
var _ticket = require("./ticket");
var _user = require("./user");

function initModels(sequelize) {
  var concert = _concert(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  ticket.belongsTo(concert, { as: "concert", foreignKey: "concert_id"});
  concert.hasMany(ticket, { as: "tickets", foreignKey: "concert_id"});

  return {
    concert,
    ticket,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
