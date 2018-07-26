exports = module.exports = (socket)=>{
	socket.on('fileStart',(data, fn)=>{
		fn("服务器确认收到了发送文件进度");
		console.log(data)
		//发送给普通用户
		socket.to(data.receiver).emit('recFileStart',data)
	});
	socket.on('fileProgress',(data, fn)=>{
		fn("服务器确认收到了发送文件进度");
		console.log(data)
		//发送给普通用户
		socket.to(data.receiver).emit('recFileProgress',data)
	});
	socket.on('fileDone',(data, fn)=>{
		fn("服务器确认收到了发送文件完成");
		console.log(data)
		//发送给普通用户
		socket.to(data.receiver).emit('recFileDone',data)
	});
}
