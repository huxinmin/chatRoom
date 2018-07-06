const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const db = require("../../middleware/db");
const auth = require('../../middleware/auth');
const messages = require('../../utils/messages');
const formidable = require('formidable');
const _ = require("lodash");

/* GET home page. */
router.post('/', function(req, res, next) {
	var form = new formidable.IncomingForm();
	const uploadDir = path.resolve(__dirname, '../../upload');
	form.uploadDir =uploadDir;
	var users = {username:"",password:"",avater:""};
	var avaterPath, avaterType;
	form.parse(req, function(err, fields, files) {
		users = Object.assign(users, fields)
		avaterPath = files["avater"]["path"]
		avaterType = files["avater"]["type"]
		console.log(users)
		console.log(avaterPath)
	});
	form.on('end', function() {
		console.log("end")
		var ext = '.'+avaterType.substring(avaterType.lastIndexOf('/')+1)
		console.log(ext)
		var newName = users.username+new Date().getTime()+ext
		console.log(newName)
		var newPath = path.join(uploadDir,newName)
		fs.rename(avaterPath, newPath, function (err) {
			if(err){
				console.log(err)
			}else{
				res.json({'1':'2'})
			}

		});
	});
	// const mine = db.findUserByName( req.body.username);
	// if (mine && mine.password === req.body.password) {
	// 	auth.setAuth(res);
	// 	auth.setUid(res, req.body.username);
	// 	res.json({ auth:true, mine:_.omit(mine,["password"]), message:messages.loginSuccess})
	// } else {
	// 	res.json({ auth: false, message: messages.loginFail});
	// }
});

module.exports = router;
