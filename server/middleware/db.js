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


const getAllUsers = ()=>{
	return db.get('users').map((item)=>{
		return _.pick(item, ['username','avater','online','remarks'])
	}).value();
}
exports.getAllUsers = getAllUsers

exports.getAllUsersExcept =(username)=>{
	var allUsers = getAllUsers()
	_.remove(allUsers,(item)=>{
						return item.username ===username
				});
	return allUsers
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
