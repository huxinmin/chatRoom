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
	const uploadDir = path.resolve(__dirname, '../../upload/avater');
	form.uploadDir =uploadDir;
	var users = {username:"",password:"",avater:""};
	var avaterPath, ext, isExist = false;
	form.parse(req, function(err, fields, files) {
		isExist = db.findUserByName( fields.username);
		avaterPath = files["avater"]["path"];
		if(isExist) return
		users = Object.assign(users, fields);
		var avaterType = files["avater"]["type"];
		ext = '.'+avaterType.substring(avaterType.lastIndexOf('/')+1);
	});
	form.on('end', function() {
		console.log("end")
		if(isExist){
			fs.unlink(avaterPath);
			res.json({auth:false,message:messages.registerExist});
		}else{
			var newName = users.username+new Date().getTime()+ext;
			var newPath = path.join(uploadDir,newName)
			fs.rename(avaterPath, newPath, function (err) {
				if(err){
					res.json({auth:false,message:messages.registerFail});
				}else{
					users = Object.assign(users, {avater:newName, online: true});
					db.addUser(users);
					auth.setAuth(res);
					auth.setUid(res, users.username);
					res.json({auth:true,message:messages.registerSuccess, mine:_.omit(users,["password"])});
				}
			});
		}
	});
});

module.exports = router;
