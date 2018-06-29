var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require("fs");

/* POST upload file*/
router.post('/',function(req, res, next){
  var form = new formidable.IncomingForm(),
  files = [],
  username = '';
  form.uploadDir = './upload';

    form
      .on('field', function(field, value) {
        // console.log(field, value);
        username = value
      })
      .on('file', function(field, file) {
      	//这里我有个疑惑，为什么数组Push才能获取到，使用赋值却获取不到file
        files.push({'file': file});
      })
      .on('end', function() {
        var filePath = './upload/'+username+'_'+new Date().getTime()+'_'+ files[0].file.name
        fs.rename(files[0].file.path, filePath, function(err){
        	res.writeHead(200, {'content-type': 'text/plain'});
        	res.end(JSON.stringify({ 'uploaded':true, 'filePath':filePath, 'fileName':files[0].file.name}));
        });
      });
    form.parse(req, function(){
    	// console.log('parse')
    });
});

module.exports = router;
