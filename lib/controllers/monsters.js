const { Router } = require('express');
const Monster = require('../models/Monster');

module.exports = Router()
  .post('/', async ({ body, user }, res, next) => {
    try{
      const monster = await Monster.insert({ ...body, user_id: user.id });
      res.json(monster);
    }catch(e){
      next(e);
    }
  });
