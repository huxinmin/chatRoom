exports = module.exports = (socket, data)=>{
	console.log(socket);
	console.log(data);
	//发送消息客户端需要ack服务端是否接收到，也就是发送成功，服务端需要ack接收端是否接收成功，接收成功后，再次emit发送消息给发送者告诉他发送成功
	//emit 给要接收消息的人
}
