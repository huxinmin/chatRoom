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

const emitFileSocketStart = (data)=>{
  socket.emit("fileStart",data, (ack)=>{
  	console.log(ack);
  });
};

const emitFileSocketProgress = (data)=>{
  socket.emit("fileProgress",data, (ack)=>{
  	console.log(ack);
  });
};

const emitFileSocketDone = (data)=>{
  socket.emit("fileDone",data, (ack)=>{
  	console.log(ack);
  });
};

const emitRoomFileSocket = (data)=>{
  socket.emit("roomFile",data, (ack)=>{
  	console.log(ack);
  });
};

export {emitLoginSocket, emitLogoutSocket,emitFileSocketStart,emitFileSocketProgress,emitFileSocketDone, emitMessagesSocket, emitRoomMessagesSocket,emitRoomFileSocket,};
