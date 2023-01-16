const { db, sequelize } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");
require("dotenv").config();

exports.concertInfo = async (req, res) => {
  try {
    const concertInfo = await db.concert.findAll();
    res.json({ data: concertInfo });
  } catch (err) {
    console.log(err);
    res.send("실패");
  }
};

exports.ticketInfo = async (req, res) => {
  const concert_id = req.query.concert_id;

  try {
    const ticketInfo = await db.ticket.findAll({
      where: { concert_id: concert_id },
    });
    res.json({ data: ticketInfo });
  } catch (err) {
    console.log(err);
    res.send("오류");
  }
};
