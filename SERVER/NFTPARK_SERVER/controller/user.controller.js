const { db, sequelize } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");
const axios = require("axios");
require("dotenv").config();

const login = async (req, res) => {
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
          client_id: "408eb292ea89d448bfc9bc935126f27b",
          code,
          redirect_uri: "http://localhost:5000/user/auth/kakao",
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

    console.log("authToken", authToken.data);
    console.log("authInfo", authInfo.data);
    res.redirect("http://localhost:3000?user=hi");
    // res.redirect("http://localhost:3000");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  login,
};
