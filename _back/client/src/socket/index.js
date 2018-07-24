import createNotification from "../components/notification";
import {server,} from "../config.js";
import renderHistoryItem from "../components/chatsWin/historyItem";
import renderChatsItem from "../components/tabs/chats/item";
import db from '../utils/db';

const socket = io({autoConnect:false,});

socket.on("recLogin", function(data) {
  createNotification(data.username, "上线了", server+"/"+data.avater);
  console.log(data);
});

socket.on("recLogout", function(data) {
  console.log(data);
});

socket.on("recMessages", (data)=>{
  console.log("recMessages");
  console.log(data);
  //如果发送者与当前curChat的用户名相同，也就是聊天框是激活的，则创建聊天历史记录，并改变lowdb数据，否则只改变数据
  //如果是第一次聊天，也就是没有聊天历史记录,则需要创建chats对话框，并标位未读
  if(window.locals.curChat.username === data.sender.username){
  	renderHistoryItem();
  }
  if(db.get('histories').find({username:data.sender.username}).value()){
  	renderChatsItem();
  	db.get('histories').find({username:data.sender.username}).assign({}).write()
  	db.get("chatsWith").find()
  }else{
  	db.get('histories').push()
  	db.get("chatsWith").push()
  }
});

socket.on("recRoomMessages", (data)=>{
  console.log("recRoomMessages");
  console.log(data);
});

export default socket;
