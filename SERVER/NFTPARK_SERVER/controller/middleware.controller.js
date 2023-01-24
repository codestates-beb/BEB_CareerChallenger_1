const { redisCli } = require("../redis/redisconnection");
const jwt = require("jsonwebtoken");
const { jwtVerify } = require("../data/jwt");
require("dotenv").config();

exports.detailMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      req.userInfo = jwtVerify(token);
    }
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.clearCookie("token");
      return res.status(419).send("토큰 만료");
    }
    if (err.name === "JsonWebTokenError") {
      res.clearCookie("token");
      return res.status(401).send("유효하지 않은 토큰");
    } else {
      console.log(err);
      return res.status(400).send("에러메세지");
    }
  }
};

exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    req.userInfo = jwtVerify(token);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.clearCookie("token");
      return res.status(419).send("토큰 만료");
    }
    if (err.name === "JsonWebTokenError") {
      res.clearCookie("token");
      return res.status(401).send("유효하지 않은 토큰");
    }
  }
};

exports.redisMiddleware = async (req, res, next) => {
  try {
    let value = await redisCli.get(req.route.path);
    value = JSON.parse(value);
    if (value) {
      // 만약 redis(캐시 메모리)에 데이터가 있다면 그대로 반환 → Cache Hit
      res.json({ data: value });
    } else {
      // Redis에 저장된게 없기 때문에 다음 미들웨어 실행
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
