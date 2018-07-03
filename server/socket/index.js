const login = require('./login');
const messages = require('./messages');

exports = module.exports = function(server) {
		var io = require('socket.io')(server);
		//开始连接
		io.on('connection', (socket)=>{
			//Mine当前登录用户发送的操作
			//涉及到文件上传，下载的操作就用http，否则就用socket
			socket.on('on_login',(data)=>{
				login(socket,data);
			});
			socket.on('on_register',(data)=>{});
			socket.on('on_avater',(data)=>{});
			socket.on('on_password',(data)=>{});
			socket.on('on_messages',(data)=>{
				messages(socket,data);
			});
			socket.on('on_oflMessages',(data)=>{});
			socket.on('on_remark',(data)=>{});
			socket.on('on_file',(data)=>{});
			socket.on('on_torrent',(data)=>{});
			socket.on('on_disconnect',(data)=>{});
			//rooms，群组内的消息
			socket.on('on_roomMessages',(data)=>{});
			socket.on('on_roomFile',(data)=>{});
			socket.on('on_roomTorrent',(data)=>{});
			socket.on('on_roomAvater',(data)=>{});
			socket.on('on_rename',(data)=>{});
			socket.on('on_create',(data)=>{});
			socket.on('on_dismss',(data)=>{});
			socket.on('on_dpName',(data)=>{});
			socket.on('on_join',(data)=>{});
			socket.on('on_leave',(data)=>{});

		});
}
