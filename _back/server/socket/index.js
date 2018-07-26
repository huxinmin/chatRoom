const login = require('./login');
const logout = require('./logout');
const messages = require('./messages');
const roomMessages = require('./roomMessages');
const file = require('./file');
const roomFile = require('./roomFile');

exports = module.exports = function(server) {
		var io = require('socket.io')(server);
		//开始连接
		io.on('connection', (socket)=>{
			//Mine当前登录用户发送的操作
			//涉及到文件上传，下载的操作就用http，否则就用socket

			login(socket);
			logout(socket);
			messages(socket);
			roomMessages(socket);
			file(socket)
			roomFile(socket);
		});
}
