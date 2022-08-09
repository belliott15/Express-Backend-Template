const jwt = require('jsonwebtoken');

function sign(payload){
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}

function verify(cookie) {
  return jwt.verify(cookie, process.env.JWT_SECRET);
}

module.exports = { sign, verify };
