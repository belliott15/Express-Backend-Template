const { verify } = require('../utils/jwtToken');

module.exports = async (req, res, next) => {
  try{
    const cookie = req.cookies[process.env.COOKIE_NAME];

    if(!cookie) throw new Error('You must be signed in to proceed');

    const user = verify(cookie);

    req.user = user;

    next();
  } catch(e) {
    e.status = 401;
    next(e);
  }
};
