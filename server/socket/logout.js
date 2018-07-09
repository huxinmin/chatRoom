const db = require("../middleware/db");

exports = module.exports = (socket)=>{
	socket.on('logout',()=>{
		console.log(socket.data.username,'退出登录了');
		db.setOffline(socket.data.username);
		socket.broadcast.emit('recLogout',socket.data)
	});
}
