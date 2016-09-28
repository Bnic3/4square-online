var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  var test = process.env.name;
  res.send(test);
});

module.exports = router;
