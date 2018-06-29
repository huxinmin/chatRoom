const express = require('express');
const router = express.Router();
const middleware = require("./middleware");

/* GET home page. */
router.post('/', function(req, res, next) {
	var user = middleware.findUser( req.body.username);
	if (user && user.password === req.body.password) {
				res.locals.isLogin = true;
				middleware.updateOnlineStatus(user.username, true)
				var usersList = middleware.getUsersList(user.username);
				var offlineMessages = middleware.getReceivedMessages(user.username);
				var roomsList = middleware.getRoomsList();
				middleware.setIsLoginCookie(res, req.body.username);
				res.json({ isLogin: true, message: "登录成功", user:user,  usersList:usersList, offlineMessages:offlineMessages, roomsList:roomsList});
		} else {
				res.locals.isLogin = true;
				res.json({ isLogin: false, message: "登录失败，用户名或密码不正确" });
	}
});

module.exports = router;
