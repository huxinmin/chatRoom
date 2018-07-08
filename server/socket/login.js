exports = module.exports = (socket)=>{
	socket.on('login',(data, fn)=>{
		fn("服务器确认收到了login事件")
		console.log(data.username,'用户登录了id是', socket.id);
		socket.data = data;
		socket.join(data.username);
		socket.broadcast.emit('recLogin',data)
	});
}
