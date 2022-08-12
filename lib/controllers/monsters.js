const { Router } = require('express');
const authorizeMonster = require('../middleware/authorizeMonster');
const Monster = require('../models/Monster');

module.exports = Router()
  .param('id', (req, res, next, id) => {
    req.id = id;
    next();
  })


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

  .put('/:id', authorizeMonster, async ({ id, user, body }, res, next) => {
    try{
      const monster = await Monster.updateById(id, user.id, body);
      res.json(monster);
    }catch(e){
      next(e);
    }
  })

  .delete('/:id', authorizeMonster, async ({ id }, res, next) => {
    try{
      const deletedMonster = await Monster.delete(id);
      res.json(deletedMonster);
    }catch(e){
      next(e);
    }
  })
;

