const express = require('express');
const router = express.Router();
const middleware = require("./middleware");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./jsonData/db.json')
const db = low(adapter)

/* GET home page. */
router.post('/', function(req, res, next) {
	db.defaults({ users: [], unReceivedMessages:[], files:[], rooms:[]}).write();
	var isExistUser = db.get('users').find({ username: req.body.username }).value();
	if(isExistUser){
		res.locals.isLogin = false;
  	res.json({staus:200, isLogin: false,message:"注册失败，用户名已存在"});
	}else{
		res.locals.isLogin = true;
		var user = {"username":req.body.username, "password":req.body.password, "avater":createAvaterRandomly() };
		var usersList = middleware.getUsersList(db);
		var roomsList = middleware.getRoomsList(db);
		middleware.setIsLoginCookie(res, req.body.username);
  	res.json({staus:200, isLogin: true, message:"注册成功",user:user, usersList:usersList, roomsList:roomsList, unReceivedMessages:null });
  	db.get('users').push(user).write()
	}
});

function createAvaterRandomly(){
	return "images/avater/"+Math.ceil(Math.random()*34)+".jpg"
}

module.exports = router;
