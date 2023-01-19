const { db, sequelize } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");
const { KakaoInfo, KakaoMessage } = require("../data/kakao");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { web3 } = require("../data/web3");
require("dotenv").config();

function jwtCreate(payload, expiresIn) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn });
}

exports.userInfo = (req, res) => {
  const userData = new KakaoInfo(
    req.userInfo.id,
    req.userInfo.nickname,
    req.userInfo.profile_image,
    req.userInfo.address
  );
  return res.status(200).json(userData.json);
};

exports.KakaoLogin = async (req, res) => {
  const code = req.query.code;
  try {
    let UserAddress;
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

    const data = await db.user.findOne({ where: authInfo.data.id });
    await axios(KakaoMessage(authToken.data.access_token)); //카톡 메세지
    if (!data) {
      const web3Data = await web3.eth.accounts.create();
      await db.user.create({
        id: authInfo.data.id,
        nickname: authInfo.data.properties.nickname,
        profile_image: authInfo.data.properties.profile_image,
        address: web3Data.address,
      });
      UserAddress = web3Data.address;
    }
    if (data) {
      UserAddress = data.dataValues.address;
    }
    const userInfo = new KakaoInfo(
      authInfo.data.id,
      authInfo.data.properties.nickname,
      authInfo.data.properties.profile_image,
      UserAddress
    );
    const jwtToken = jwtCreate(userInfo.json, "10m");
    res.cookie("token", jwtToken, { maxAge: 600000, httpOnly: true });
    return res.redirect("http://localhost:3000?login=ok");
  } catch (err) {
    console.log(err);
    return res.redirect("http://localhost:3000/error");
  }
};
