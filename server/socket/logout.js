exports = module.exports = (socket)=>{
	socket.on('disconnect',()=>{
		console.log('用户退出登录了');
		console.log(socket.username)
		socket.broadcast.emit('recLogout',{username:socket.username})
	});
}
