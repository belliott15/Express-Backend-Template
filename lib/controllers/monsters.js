const { Router } = require('express');
const authorizeMonster = require('../middleware/authorizeMonster');
const Monster = require('../models/Monster');

module.exports = Router()
  .post('/', async ({ body, user }, res, next) => {
    try{
      const monster = await Monster.insert({ ...body, user_id: user.id });
      res.json(monster);
    }catch(e){
      next(e);
    }
  })
  
  .get('/', async ({ user }, res, next) => {
    try{
      const monsters = await Monster.getAll(user.id);
      res.json(monsters);
    }catch(e){
      next(e);
    }
  })

  .get('/:id', authorizeMonster, async ({ id }, res, next) => {
    try{
      const monster = await Monster.getById(id);
      res.json(monster);
    }catch(e){
      next(e);
    }
  })
;

