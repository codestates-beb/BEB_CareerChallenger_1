const express = require("express");
const app = express();
const cors = require("cors");
const port = 5002;
const amqp = require("amqplib");
const { send_message } = require("./sns");
const { db } = require("./sequelize/models/index.js");
const { Op } = require("sequelize");
require("dotenv").config();

app.use(cors());

app.listen(port, () => {
  console.log(port, "서버실행");
});

app.get("/", (req, res) => {
  res.send("성공");
});

(async () => {
  try {
    const url = "amqp://localhost"; //rabbitmq url
    const queue = "NFTPARK";
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      async (message) => {
        console.log("메세지 읽는중 =======================");
        let address_data = message.content.toString().split(",").slice(0, -1);
        let sns_data = [];
        const winnerNumbers = await db.user.findAll({
          attributes: ["phone_number", "nickname"],
          where: {
            address: { [Op.in]: address_data },
          },
        });
        winnerNumbers.forEach((element) => {
          sns_data.push({
            to: `${element.dataValues.phone_number}`,
            content: `${element.dataValues.nickname}님 콘서트에 당첨되셨습니다.`,
          });
        });
        // send_message(sns_data);
        channel.ack(message);
        console.log("메세지 읽음 =======================");
      },
      { noAck: false }
    );
    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.log(err);
  }
})();
