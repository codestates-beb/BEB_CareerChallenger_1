const express = require("express");
const app = express();
const cors = require("cors");
const port = 5001;
const { sequelize } = require("./sequelize/models/index.js");

app.use(cors());

app.listen(port, () => {
  console.log(port, "서버실행");
});

app.get("/", (req, res) => {
  res.send("성공");
});

sequelize.sync();
