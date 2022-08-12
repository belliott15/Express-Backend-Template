const Monster = require('../models/Monster');

module.exports = async (req, res, next) => {
  try{
    const monster = await Monster.getById(req.params.id);
    if(!monster || monster.user_id !== req.user.id) {
      throw new Error('Access Denied');
    }
    next();
  }catch(e){
    e.status = 403;
    next(e);
  }
};
