const { db, sequelize } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");
const { KakaoInfo } = require("../data/kakaoInfo");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtCreate(payload, expiresIn) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn });
}

exports.KakaoLogin = async (req, res) => {
  const code = req.query.code;
  try {
    const authToken = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "authorization_code",
          client_id: process.env.client_id,
          code,
          redirect_uri: process.env.redirect_uri,
        },
      }
    );
    const authInfo = await axios.post(
      "https://kapi.kakao.com/v2/user/me",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + authToken.data.access_token,
        },
      }
    );
    const userInfo = new KakaoInfo(
      authInfo.data.id,
      authInfo.data.properties.nickname,
      authInfo.data.properties.profile_image
    );
    db.user.findOne({ where: userInfo.id }).then((data) => {
      const jwtToken = jwtCreate(userInfo.json, "10m");
      if (!data) {
        db.user.create(userInfo).then((data) => {
          res.cookie("token", jwtToken, { maxAge: 600000, httpOnly: true });
          return res.redirect("http://localhost:3000");
        });
      }
      if (data) {
        res.cookie("token", jwtToken, { maxAge: 600000, httpOnly: true });
        return res.redirect("http://localhost:3000");
      }
    });
  } catch (err) {
    console.log(err);
    return res.redirect("http://localhost:3000/error");
  }
};

exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    req.userInfo = jwt.verify(token, process.env.SECRET_KEY);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.clearCookie("token");
      return res.status(419).send("토큰 만료");
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send("유효하지 않은 토큰");
    }
  }
};
