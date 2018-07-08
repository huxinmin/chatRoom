import socket from "./index";

const emitLoginSocket = (data)=>{
	socket.connect();
  socket.emit("login", data, function(ack){
  	console.log(ack)
  });
};

const emitLogoutSocket = ()=>{
  socket.disconnect();
};

const emitMessagesSocket = (data)=>{
  socket.emit("messages",data, (ack)=>{
  	console.log(ack);
  });
};

export {emitLoginSocket, emitLogoutSocket, emitMessagesSocket};