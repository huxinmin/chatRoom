exports = module.exports = (socket)=>{
	//发送消息客户端需要ack服务端是否接收到，也就是发送成功，服务端需要ack接收端是否接收成功，接收成功后，再次emit发送消息给发送者告诉他发送成功
	socket.on('messages',(data, fn)=>{
		fn("服务器确认收到了发送的消息");
		console.log(data)
		socket.to(data.receiver).emit('recMessages',data)
	});
}
