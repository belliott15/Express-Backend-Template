const { Router } = require('express');
const User = require('../models/User');

const isSecure = process.env.SECURE_COOKIES === 'true';
const cookieOptions = {
  httpOnly: true,
  secure: isSecure,
  sameSite: isSecure ? 'none' : 'strict',
  maxAge: (1000 * 60 * 60 * 24),
};

module.exports = Router()
//verify route fist
  .get('/verify', (req, res) => {
    res.json(req.user);
  })

  .post('/signup', async (req, res, next) => {
    try{
      const user = await User.insert(req.body);
      const token = sign({ user });

      res.cookie(process.env.COOKIE_NAME, token, cookieOptions)
    }catch(e){
      next(e);
    }
  })

  


;
