const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
var path = require('path');
const adapter = new FileSync(path.resolve(__dirname,'../db.json'));
const db = low(adapter);

exports.findUserByName = (username)=>{
	return db.get('users').find({ username: username }).value();
}