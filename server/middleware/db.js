const _ = require('lodash');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
var path = require('path');
const adapter = new FileSync(path.resolve(__dirname,'../db.json'));
const db = low(adapter);

exports.findUserByName = (username)=>{
	return db.get('users').find({ username: username }).value();
}

exports.findRoomByName = (roomname)=>{
	return db.get('rooms').find({ roomname: roomname }).value();
}
/**获取所有用户，需要去掉自己
  *未完成
  *
  */
exports.getAllUsers = ()=>{
	return db.get('users').map((item)=>{
		return _.pick(item, ['username','avater','online','remarks'])
	}).value();
}

exports.getAllRooms = ()=>{
	return db.get('rooms').value();
}

exports.setOnline = (username)=>{
	updateOnlineStatus(username, true);
}

exports.setOffline = (username)=>{
	updateOnlineStatus(username, false);
}

const updateOnlineStatus = (username, status)=>{
	db.get('users').find({ username: username }).assign({ online: status}).write();
}

exports.addUser =(user)=>{
	db.get('users').push(user).write()
}
