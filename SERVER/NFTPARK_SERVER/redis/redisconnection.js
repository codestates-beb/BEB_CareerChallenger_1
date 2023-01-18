const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true, // legacy 모드 반드시 설정 !!
});

redisClient.connect();
// redis
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

// redis v4 연결 (비동기)
const redisCli = redisClient.v4;

module.exports = { redisCli };
