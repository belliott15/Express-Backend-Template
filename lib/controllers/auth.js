const { Router } = require('express');

module.exports = Router()
//verify route fist
  .get('/verify', (req, res) => {
    res.json(req.user);
  });



