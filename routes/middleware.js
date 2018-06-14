const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./jsonData/db.json')

exports.db = low(adapter);

//验证登录
exports.requireLogin = function (req, res, next) {
	if (!req.signedCookies.isLogin) {
		res.status(401).end();
	} else {
		res.locals.isLogin = true;
		next();
	}
};
//初始化locals
exports.initLocals = function(req, res, next){
	res.locals.isLogin = false;
	next();
}

//获取用户列表，要除了用户自己
exports.getUsersList = function(db, username){
	return db.get('users').filter((item)=>{
		return item.username !== username
	}).value()
}

//获取群聊列表
exports.getRoomsList = function(db){
	return db.get('rooms').value()
}

//获取未接收信息列表
exports.getReceivedMessages = function(db , username){
	return db.get('unReceivedMessages').filter({receiver:username}).value()
}

//设置登录状态cookie
exports.setIsLoginCookie = function(res, username){
	res.cookie('isLogin', true, { signed: true, path:'/', maxAge: 90000000, httpOnly: true });
	res.cookie('username', username, { signed: true, path:'/', maxAge: 90000000, httpOnly: true });
}
//取消登录状态cookie
exports.clearIsLoginCookie = function(res){
	res.clearCookie('isLogin', { signed: true, path:'/', maxAge: 90000000, httpOnly: true });
	res.clearCookie('username', { signed: true, path:'/', maxAge: 90000000, httpOnly: true });
}
