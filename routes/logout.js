var express = require('express');
var router = express.Router();
const middleware = require("./middleware");

/* GET home page. */
router.post('/', function(req, res, next) {
	middleware.clearIsLoginCookie(res);
  res.locals.isLogin = false;
 	res.json({logout:true});
});

module.exports = router;
