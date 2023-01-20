const jwt = require("jsonwebtoken");

function jwtCreate(payload, expiresIn) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expiresIn });
}

function jwtVerify(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = {
  jwtCreate,
  jwtVerify,
};
