const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./jsonData/db.json')

const db = low(adapter);
exports.db = db;
db.defaults({ users: [], offlineMessages:[], rooms:[]}).write();
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
exports.getUsersList = function(username){
	return db.get('users').filter((item)=>{
		return item.username !== username
	}).value()
}

//获取群聊列表
exports.getRoomsList = function(){
	return db.get('rooms').value()
}

//获取未接收信息列表
exports.getReceivedMessages = function(username){
	return db.get('offlineMessages').filter({receiver:username}).value()
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
//登录后，修改db.json中用户在线状态
exports.updateOnlineStatus = function(username, status){
	db.get('users').find({ username: username }).set("isOnline", status).write();
}
//查找对应用户
exports.findUser = function(username){
	return db.get('users').find({ username: username }).value();
}
//添加用户
exports.addUser = function(user){
	db.get('users').push(user).write()
}
