require("dotenv").config();
const { db } = require("../sequelize/models");
const amqp = require("amqplib");
const { redisCli } = require("../redis/redisconnection");
const {
  _draw,
  _entry,
  merkleTreeRoot,
  merkleTreeProof,
  canClaim,
  _buyNFT,
  airdrop
} = require("../function/ticketing.function");
const {
  isRegisterProduction,
  getString,
  _registerTicket
} = require("../function/parkErc721.function");

//process.env.RPC_URL
module.exports = {
  test: async (req, res) => {
    try {
      return res.status(200).send(winners);
    } catch (error) {
      return res.status(404).send(`error MESSAGE : ${error}`);
    }
  },
  // 상품(티켓)원가 가격 등록
  registerTicket: async (req, res) => {
    try {
      const { title, cost } = req.body;
      const tileTypeBytes = getString(title);
      if (cost.length < 18) {
        return res.status(400).send(`error MESSAGE : check decimals`);
      }
      console.log(tileTypeBytes);
      const result = await _registerTicket(tileTypeBytes, cost);

      // false tx
      if (result.status === false) {
        return res.status(404).send(`error MESSAGE : FALSE entry Transaction`);
      }
      return res.status(200).send("success register tickent");
    } catch (error) {
      return res.status(404).send(`error MESSAGE : ${error}`);
    }
  },
  // 응모
  entry: async (req, res) => {
    try {
      const { name, title, address } = req.body;
      // keccak256(encodePacked(티켓명 + 등급)) 잘못입력 시, 진행x
      const tileTypeBytes = getString(title);
      console.log("tileTypeBytes = ", tileTypeBytes);
      console.log("tile = ", title);
      const _isRegisterProduction = await isRegisterProduction(tileTypeBytes);

      // 스마트컨트렉트에 등록된 상품이 아니면 진행x
      if (!_isRegisterProduction) {
        return res.status(400).send(`Unregistered Production`);
      }

      // 응모하기 : transection to Smart Contract
      const entryResult = await _entry(address, tileTypeBytes);

      // false tx
      if (entryResult.status === false) {
        return res.status(404).send(`error MESSAGE : FALSE entry Transaction`);
      }

      await redisCli.SADD(title, address);
      // applicant DB 데이터 저장 구현
      // table info : [id][name][address][title][time(default now)]
      const result = await db["applicant"].create({
        name,
        address,
        title,
      });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(404).send(`error MESSAGE : ${error}`);
    }
  },
  // 추첨
  draw: async (req, res) => {
    try {
      const { title } = req.body

      // // keccak256(encodePacked(티켓명 + 등급)) 잘못입력 시, 진행x
      const tileTypeBytes = getString(title);
      const _isRegisterProduction = await isRegisterProduction(tileTypeBytes)

      // 스마트컨트렉트에 등록된 상품이 아니면 진행x
      if(!_isRegisterProduction) {
          return res.status(400).send(`Unregistered Production`)
      }

      console.log('당첨자 선별 중');
      const winner = _draw();
      console.log('당첨자 선별 완료');
      
      let data = [];
      let test = [];
      // let connection;
      console.log('당첨자 저장 진행 중');
      try {
        // connection = await amqp.connect("amqp://localhost");
        // const queue = "NFTPARK";
        // const channel = await connection.createChannel();
        // await channel.assertQueue(queue, { durable: false });
        winner.forEach(async (element) => {
          data.push({ address: element, title: title});
          // test.push(Buffer.from(element + ","));
        });
        // await channel.sendToQueue(queue, Buffer.concat(test));
        // console.log(" [x] Sent '%s'", test);

        await db.winners.bulkCreate(data);
        // await channel.close();
      } catch (err) {
        console.warn(err);
      } finally {
        // if (connection) await connection.close();
      }
      console.log('당첨자 저장 완료');

      // todo(SM) : 당첨자 리스트 MerkleTree Root Smart Contract에 저장
      console.log('MerkleTree Root 생성 및 저장 중');
      const root = merkleTreeRoot(winner)
      await airdrop(tileTypeBytes,root)
      console.log('MerkleTree Root 생성 및 저장 완료');
      return res.status(200).json({ winner: winner });
    } catch (error) {
      return res.status(404).send(`error MESSAGE : ${error}`);
    }
  },
  getMyEntry: async (req, res) => {
    try {
      const { address } = req.body;
      const myEntry = await db["applicant"].findAll({
        attributes: ['address','title'],
        where: {
          address
        },
      });

      return res.status(200).send(myEntry);
    } catch (error) {
      return res.status(404).send(`error MESSAGE : ${error}`);
    }
  },
  // 응모 당첨 확인
  isWinner: async (req, res) => {
    try {
      const { title, address } = req.body;
      const winners = await db["winners"].findAll({
        attributes: ['address'],
        where: {
          title
        },
      });
      const _winners = winners.map((winner) => winner.dataValues.address)

      // typeof array
      const proof = merkleTreeProof(_winners, address);
      const tileTypeBytes = getString(title);

      const result = await canClaim(tileTypeBytes, address, proof);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(404).send(`error MESSAGE : ${error}`);
    }
  },
  // 티켓(NFT) 구매
  buyNFT: async (req, res) => {
    try {
      const { title, to, url } = req.body;
      const winners = await db["winners"].findAll({
        attributes: ['address'],
        where: {
          title
        },
      });
      const _winners = winners.map((winner) => winner.dataValues.address)
      // typeof array
      const proof = merkleTreeProof(_winners, to);
      const tileTypeBytes = getString(title);
      await _buyNFT(tileTypeBytes, to, url, proof);
      return res.status(200).send("success but ticket");
    } catch (error) {
      return res.status(404).send(`error MESSAGE : ${error}`);
    }
  },
};
