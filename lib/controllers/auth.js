const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const User = require('../models/User');
const { sign } = require('../utils/jwtToken');
const HttpError = require('../utils/HttpError');


const isSecure = process.env.SECURE_COOKIES === 'true';
const cookieOptions = {
  httpOnly: true,
  secure: isSecure,
  sameSite: isSecure ? 'none' : 'strict',
  maxAge: 1000 * 60 * 60 * 24,
};

module.exports = Router()
//verify route fist
  .get('/verify', authenticate, (req, res) => {
    res.json(req.user);
  })

  .post('/signup', async ({ body }, res, next) => {
    try{
      const user = await User.insert(body);
      const token = sign({ user });
      
      res.cookie(process.env.COOKIE_NAME, token, cookieOptions).json(user);
    }catch(e){
      next(e);
    }
  })
  
  .post('/signin', async (req, res, next) => {
    try{
      const { email, password } = req.body;
      const user = await User.getByEmail(email);

      let isValid = false;
      if(user) {
        isValid = await user.isValidPassword(password);
      }

      if(!isValid){
        throw new HttpError('Invalid Password', 400);
      }

      const token = sign({ user });
      res.cookie(process.env.COOKIE_NAME, token, cookieOptions).json(user);
    }catch(e){
      next(e);
    }

    
  })


;
