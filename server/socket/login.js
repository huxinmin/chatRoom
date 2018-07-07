exports = module.exports = (socket)=>{
	socket.on('login',(data, fn)=>{
		fn("服务器确认收到了login事件")
		console.log('用户登录了');
		console.log(socket.id)
		socket.username = data.username;
		socket.join(data.username);
		socket.broadcast.emit('recLogin',data)
	});
}
