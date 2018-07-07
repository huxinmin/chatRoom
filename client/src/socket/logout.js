import socket from "./init";

const emitLogoutSocket = ()=>{
  socket.close();
};

const recUsersLogoutSocket = ()=>{
  socket.on("recLogout", function(data) {
    console.log("接收到用户退出登录信息");
    console.log(data);
  });
};

export {emitLogoutSocket, recUsersLogoutSocket};