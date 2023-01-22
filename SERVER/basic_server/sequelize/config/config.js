require("dotenv").config();

const development = {
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWD,
  database: process.env.DB_NAME,
  logging:false
};
module.exports = { development };
