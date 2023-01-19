var DataTypes = require("sequelize").DataTypes;
var _applicant = require("./applicant");
var _concert = require("./concert");
var _ticket = require("./ticket");
var _user = require("./user");
var _winners = require("./winners");

function initModels(sequelize) {
  var applicant = _applicant(sequelize, DataTypes);
  var concert = _concert(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var winners = _winners(sequelize, DataTypes);

  ticket.belongsTo(concert, { as: "concert", foreignKey: "concert_id"});
  concert.hasMany(ticket, { as: "tickets", foreignKey: "concert_id"});

  return {
    applicant,
    concert,
    ticket,
    user,
    winners,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
