const Rabbitmq = require("./rabbitmq");
const url = "amqp://localhost"; //rabbitmq url
const queue = "NFTPARK"; //임시 queue이름이고 필요한 상황에 맞게 이름 따로 지정해줘야 한다.
module.exports = {
  send_message: async (req, res) => {
    try {
      let { msg } = req.body;
      const conn = new Rabbitmq(url, queue);
      await conn.send_message(msg);
      console.log(msg);
      res.status(200).json({ result: true });
    } catch (error) {
      console.log("send_mssage 함수 에러", error);
    }
  },
  recv_message: async (req, res) => {
    try {
      const conn = new Rabbitmq(url, queue);
      const msg = await conn.recv_message();
      res.status(200).json({ result: msg });
    } catch (error) {}
  },
};
