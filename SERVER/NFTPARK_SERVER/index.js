const express = require("express");
const redis = require("redis");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = 5000;
require("dotenv").config();

// redis

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true, // legacy 모드 반드시 설정 !!
});
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4;

// redis

app.use(
  express.json(),
  cors({ origin: true, credentials: true }),
  cookieParser()
);

app.listen(port, () => {
  console.log(port, "서버실행");
});

require("./routes/main.route.js")(app);
