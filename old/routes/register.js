const express = require('express');
const router = express.Router();
const middleware = require("./middleware");


/* GET home page. */
router.post('/', function(req, res, next) {
	var isExistUser = middleware.findUser(req.body.username );
	if(isExistUser){
		res.locals.isLogin = false;
  	res.json({staus:200, isLogin: false,message:"注册失败，用户名已存在"});
	}else{
		res.locals.isLogin = true;
		var user = {"username":req.body.username, "password":req.body.password, "avater":createAvaterRandomly() };
		var usersList = middleware.getUsersList();
		var roomsList = middleware.getRoomsList();
		middleware.setIsLoginCookie(res, req.body.username);
  	res.json({staus:200, isLogin: true, message:"注册成功",user:user, usersList:usersList, roomsList:roomsList, offlineMessages:null });
  	middleware.addUser(user)
	}
});

function createAvaterRandomly(){
	return "images/avater/"+Math.ceil(Math.random()*34)+".jpg"
}

module.exports = router;
