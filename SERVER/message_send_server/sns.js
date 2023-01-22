const axios = require("axios");
const CryptoJS = require("crypto-js");
const date = Date.now().toString();

function makeSignature(uri) {
  var space = " "; // one space
  var newLine = "\n"; // new line
  var method = "POST"; // method
  var accessKey = process.env.SENS_ACCESS_KEY; // access key id (from portal or Sub Account)
  var secretKey = process.env.SENS_SECRET_KEY; // secret key (from portal or Sub Account)

  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(uri);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);

  var hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}

const send_message = async () => {
  console.log("send_message 함수 실행중");
  // 환경변수로 저장했던 중요한 정보들
  try {
    const serviceId = process.env.SENS_SERVICE_ID;
    const my_number = process.env.SENS_MYNUM;
    const uri = `/sms/v2/services/${serviceId}/messages`;
    const signature = makeSignature(uri);
    await axios.post(
      `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`,
      {
        type: "SMS",
        countryCode: "82",
        from: my_number,
        content: `님 문자왔나요?`,
        messages: [{ to: `${my_number}` }],
      },
      {
        headers: {
          "Contenc-type": "application/json; charset=utf-8",
          "x-ncp-iam-access-key": process.env.SENS_ACCESS_KEY,
          "x-ncp-apigw-timestamp": date,
          "x-ncp-apigw-signature-v2": signature,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  send_message,
};
