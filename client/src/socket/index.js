const socket = io({autoConnect:false});

socket.on("recLogin", function(data) {
  console.log("接收到用户登录信息");
  console.log(data);
});

socket.on("recLogout", function(data) {
  console.log("接收到用户退出登录信息");
  console.log(data);
});

export default socket;