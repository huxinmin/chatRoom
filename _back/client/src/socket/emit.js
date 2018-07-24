import socket from "./index";

const emitLoginSocket = (data)=>{
  socket.connect();
  socket.emit("login", data, function(ack){
  	console.log(ack);
  });
};

const emitLogoutSocket = ()=>{
  socket.emit("logout");
  socket.disconnect();
};

const emitMessagesSocket = (data)=>{
  socket.emit("messages",data, (ack)=>{
  	console.log(ack);
  });
};

const emitRoomMessagesSocket = (data)=>{
  socket.emit("roomMessages",data, (ack)=>{
  	console.log(ack);
  });
};

const emitFileSocket = (data)=>{
  socket.emit("file",data, (ack)=>{
  	console.log(ack);
  });
};

const emitRoomFileSocket = (data)=>{
  socket.emit("roomFile",data, (ack)=>{
  	console.log(ack);
  });
};

export {emitLoginSocket, emitLogoutSocket, emitMessagesSocket, emitRoomMessagesSocket,};
