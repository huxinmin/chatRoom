import socket from "./init";

const emitLoginSocket = (data)=>{
  socket.open();
  socket.emit("login", data, function(data){
  	console.log(data)
  });
};

const recUsersLoginSocket = ()=>{
  socket.on("recLogin", function(data) {
    console.log("接收到用户登录信息");
    console.log(data);
  });
};

export {emitLoginSocket, recUsersLoginSocket};