exports = module.exports = (socket)=>{
	socket.on('roomFileStart',(data, fn)=>{
		fn("服务器确认收到了发送群文件开始");
		console.log('服务器确认收到了发送群文件进度',data)
		socket.broadcast.emit('recRoomFileStart',data)
	});
	socket.on('roomFileProgress',(data, fn)=>{
		fn("服务器确认收到了发送群文件进度");
		console.log('服务器确认收到了发送群文件进度',data)
		socket.broadcast.emit('recRoomFileProgress',data)
	});
	socket.on('roomFileDone',(data, fn)=>{
		fn("服务器确认收到了发送群文件完成");
		console.log('服务器确认收到了发送群文件完成',data)
		socket.broadcast.emit('recRoomFileDone',data)
	});
}
