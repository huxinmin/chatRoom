import socket from "./index";

const emitLoginSocket = (data)=>{
	socket.connect();
  socket.emit("login", data, function(data){
  	console.log(data)
  });
};

$(document).on('click',()=>{
	console.log(socket)
})


const emitLogoutSocket = ()=>{
  socket.disconnect();
};


export {emitLoginSocket, emitLogoutSocket};