const jwt = require('jsonwebtoken');
const JWT_SECRET = `${process.env.JWT_SECRET}`;

function sign(payload){
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d',
  });
}

function verify(cookie) {
  return jwt.verify(cookie, JWT_SECRET);
}

module.exports = { sign, verify };
