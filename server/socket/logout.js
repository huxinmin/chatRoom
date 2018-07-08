exports = module.exports = (socket)=>{
	socket.on('disconnect',()=>{
		console.log(socket.data.username,'退出登录了');
		socket.broadcast.emit('recLogout',socket.data)
	});
}
