# chatRoom
类似微信的一个简单的传送文件或者发送消息的简单聊天系统，在线地址：[https://www.huxinmin.com/chatRoom](https://www.huxinmin.com/chatRoom)

## 功能
- 用户注册，登录，退出
- 在线聊天，群组聊天
- 发送文件
- 分享P2P文件
- 支持浏览器桌面通知

## 特性
- 前后端分离架构  
虽然是前后端分离架构，你不仅可以将`client`前端页面部署在别的域下，也可以部署在同一个域下：
  - 将`client/src/consig`文件进行配置`crossDomain`是否跨域，`server`服务器主机地址
  - 将根目录下的`.env`文件进行配置，`clientPort`前端端口，`serverPort`服务端端口，`AccessControlAllowOrigin`前端主机地址，`crossDomain`是否跨域
- 前端有三个版本，分别是jquey，react， angular, vue

## 参考及依赖
- [instant.io](https://github.com/webtorrent/instant.io)
- [webtorrent](https://github.com/webtorrent/webtorrent)
- [fileSaver](https://github.com/eligrey/FileSaver.js)
- [streamSaver](https://github.com/jimmywarting/StreamSaver.js)
- [lowdb](https://github.com/typicode/lowdb)
- [formidable](https://github.com/felixge/node-formidable)
- [express](https://github.com/expressjs/express)
- [socket.io](https://github.com/socketio/socket.io)
- [jszip](https://github.com/Stuk/jszip)
- [jquery.fileupload](https://github.com/blueimp/jQuery-File-Upload)