
exports = module.exports = function(server) {
		var io = require('socket.io')(server);
		//开始连接
		io.on('connection', (socket) => {
			console.log("socket connection");
			console.log(socket.username)
		});
}
