var express = require('express');
var router = express.Router();
const middleware = require("./middleware");

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.signedCookies.isLogin) {
		//这里我觉得可能有问题，是否要做是第一次登录成功访问，是则重新获取，不是则使用缓存
		//不然每次刷新都会重新获取有性能问题
		res.locals.isLogin = true;
		var user = middleware.findUser(req.signedCookies.username);
		//如果不在线则更新为在线状态
		if(!user.isOnline){
			middleware.updateOnlineStatus(req.signedCookies.username, true)
		}
		console.log(user)
		console.log(req.signedCookies)
		res.locals.user = user;
		res.locals.usersList = middleware.getUsersList(user.username);
		res.locals.roomsList = middleware.getRoomsList();
		res.locals.offlineMessages = middleware.getReceivedMessages(user.username);
	}else{
		res.locals.isLogin = false;
	}
  res.render('index', { title: '在线简单聊天系统'});
});

module.exports = router;
