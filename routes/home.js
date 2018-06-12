var express = require('express');
var router = express.Router();
const middleware = require("./middleware");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./jsonData/db.json')
const db = low(adapter)

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.signedCookies.isLogin) {
		//这里我觉得可能有问题，是否要做是第一次登录成功访问，是则重新获取，不是则使用缓存
		//不然每次刷新都会重新获取有性能问题
		res.locals.isLogin = true;
		var user = db.get('users').find({ username: req.signedCookies.username }).value();
		console.log(user)
		res.locals.user = user;
		res.locals.usersList = middleware.getUsersList(db, user.username);
		res.locals.roomsList = middleware.getRoomsList(db);
		res.locals.unReceivedMessages = middleware.getReceivedMessages(db, user.username);
	}else{
		res.locals.isLogin = false;
	}
  res.render('index', { title: '在线简单聊天系统'});
});

module.exports = router;
