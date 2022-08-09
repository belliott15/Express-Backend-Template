const { Router } = require('express');

module.exports = Router()
  .post('/', async ({ body, user }, res, next) => {
    try{
      const monster = await Monster.insert({ ...body, user_id: user.id });
      res.json(monster);
    }catch(e){
      next(e);
    }
  });
