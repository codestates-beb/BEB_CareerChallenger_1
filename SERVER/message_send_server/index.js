const express = require("express");
const app = express();
const cors = require("cors");
const port = 5002;
const amqp = require("amqplib");
const { send_message } = require("./sns");
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
      (message) => {
        console.log(" [x] Received = " + message.content.toString());
        channel.ack(message);
      },
      { noAck: false }
    );

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.log(err);
  }
})();
