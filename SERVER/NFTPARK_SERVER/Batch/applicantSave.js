const cron = require("node-cron");
const { redisCli } = require("../redis/redisconnection");
const { db, sequelize } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");
const amqp = require("amqplib");

exports.applicantSaveBatch = async () => {
  try {
    const url = "amqp://localhost"; //rabbitmq url
    const queue = "DataLoad";
    let concertTitles = [];
    cron
      .schedule("* 3 * * *", async () => {
        console.log("배치 프로그램 시작");
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
            concertTitles.push(message.content.toString());
            channel.ack(message);
          },
          { noAck: false }
        );
        setTimeout(async () => {
          await channel.close();
          await connection.close();
          await applicantDataLoad(concertTitles);
          console.log("배치 프로그램 종료");
        }, 5000);
      })
      .start();
  } catch (err) {
    console.log(err);
  }
};

const applicantDataLoad = async (concertTitles) => {
  while (concertTitles?.length) {
    let applicantDataList = [];
    const Title = concertTitles.pop();
    const AddressDatas = await redisCli.SMEMBERS(Title);
    const userDatas = await db.user.findAll({
      attributes: ["nickname", "address"],
      where: {
        address: {
          [Op.in]: AddressDatas,
        },
      },
    });
    userDatas.forEach((element) => {
      applicantDataList.push({
        name: element.dataValues.nickname,
        address: element.dataValues.address,
        title: Title,
      });
    });
    await db.applicant.bulkCreate(applicantDataList);
    // await redisCli.DEL(Title);  // 레디스 메모리관리 삭제
  }
};
