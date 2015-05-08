var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 获取用户信息
router.get('/profile', function(req, res, next) {

});


module.exports = router;