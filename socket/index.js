const middleware = require("../routes/middleware");

exports = module.exports = function(server) {
		var io = require('socket.io')(server);
		var room = middleware.getRoomsList()[0];
		//开始连接
		io.on('connection', (socket) => {
			console.log("socket connection");
			console.log(socket.username)
			//接收用户登录信息
			//并告诉其他用户有用户登录了
			socket.on('login',(data)=>{
				console.log("login")
				console.log(data)
				socket.username = data.username;
				//使用用户名代替它的房间名让socket加入，这样以后就能通过username进行通信了
				socket.join(data.username);
				//加入群聊
				socket.join(room.username);
				socket.broadcast.emit('userLogin',data)
				middleware.updateOnlineStatus(socket.username, true)
			});
			//接收用户退出登录消息
			//并告诉其他用户该用户退出登录
			socket.on('disconnect', ()=>{
				console.log('logout')
				console.log(socket.id)
				console.log(socket.username)
				socket.broadcast.emit('userLogout',socket.username)
				middleware.updateOnlineStatus(socket.username, false)
			});
			//接收用户发的消息
			//并告诉正在聊天的用户
			//这里有Bug是正则聊天用户不是所有，先这样写试试
			socket.on('sendMessage', (data)=>{
				console.log("sendMessage");
				// console.log(data)
				socket.broadcast.to(data.receiver).emit('userSendMessage', data);
			});
			//接收用户发送的文件
			socket.on('sendFile', (data)=>{
				console.log("sendFile");
				// console.log(data)
				socket.broadcast.to(data.receiver).emit('userSendFile', data);
			});
			//接收用户发送的P2P文件分享消息
			socket.on("sendP2pTorrent", (data)=>{
				console.log("sendP2pTorrent")
				console.log(data)
				socket.broadcast.to(data.receiver).emit('userSendP2pTorrent', data);
			});
		});
}
