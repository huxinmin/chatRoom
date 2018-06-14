const express = require('express');
const router = express.Router();
const middleware = require("./middleware");

/* GET home page. */
router.post('/', function(req, res, next) {
	var user = middleware.db.get('users').find({ username: req.body.username }).value();
	if (user && user.password === req.body.password) {
				res.locals.isLogin = true;
				var usersList = middleware.getUsersList(middleware.db, user.username);
				var unReceivedMessages = middleware.getReceivedMessages(middleware.db, user.username);
				var roomsList = middleware.getRoomsList(middleware.db);
				middleware.setIsLoginCookie(res, req.body.username);
				res.json({ isLogin: true, message: "登录成功", user:user,  usersList:usersList, unReceivedMessages:unReceivedMessages, roomsList:roomsList});
		} else {
				res.locals.isLogin = true;
				res.json({ isLogin: false, message: "登录失败，用户名或密码不正确" });
	}
});

module.exports = router;
