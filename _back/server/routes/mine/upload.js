const express = require('express');
const router = express.Router();
const db = require("../../middleware/db");
const auth = require('../../middleware/auth');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.post('/', auth.requireAuth, function(req, res, next) {
	var form = new formidable.IncomingForm();
	const uploadDir = path.resolve(__dirname, '../../upload/file');
	form.uploadDir =uploadDir;
	var id, oldPath, ext;
	form.parse(req, function(err, fields, files) {
		id = fields.id
		oldPath = files['file']['path']
		var type = fields.type;
		console.log(fields)
		ext = '.'+type.substring(type.lastIndexOf('/')+1);
	});
	form.on('end', function() {
		console.log("upload end")
		var newPath = path.join(uploadDir,id)+ext
			fs.rename(oldPath, newPath, function (err) {
				if(err){
					res.json({status:false});
				}else{
					res.json({status:true, url:id+ext});
				}
			});
	});
});

module.exports = router;
