import renderHistoryItem from "../chatsWin/historyItem";
import {server,} from "../../config.js";
import {emitMessagesSocket, emitRoomMessagesSocket,} from "../../socket/emit";
import db from '../../utils/db';

const chatsInputEvent = ()=>{
  $(document).on("click", ".chats-input-btn", function(){
    const inputCont = $(".chats-input-text");
    const message = inputCont.html();
    if(!message || message.length===0){ return; }
    const chatsWin = $(".chats-win-history-group");
    const now = moment().format("MM-DD HH:mm");
    const data = [{isMine:"true", message:message, time:now, avater:server+"/"+window.locals.mine.avater,},];
    renderHistoryItem(chatsWin, data);
    inputCont.html("");
    const curChat = window.locals.curChat;
    var socketMessages = {sender:window.locals.mine,receiver:curChat.username,message:message,time:now,};
    console.log("发送消息");
    if(!curChat.isRoom){
      const itemName = "chats_"+curChat.username;
      emitMessagesSocket(socketMessages);
    }else{
    	emitRoomMessagesSocket(socketMessages);
      const itemName = "roomChats_"+curChat.username;
    }
    /** 更新本地chatsWith
     *
    */
    var history = db.get('histories');
    if( history.find({ username: curChat.username }).value() ){
    	history.find({ username: curChat.username }).assign({lastMess:message,time:now}).write()
    }else{
    	history.push({username:curChat.username,avater:server+"/"+curChat.avater,lastMess:message,time:now}).write()
    }
    var chatsWith = db.get('chatsWith');
    const oneHistory = {
    	sender:window.locals.mine.username,
    	senderAvater:server+"/"+window.locals.mine.avater,
    	receiver:curChat.username,
    	receiverAvater:server+"/"+curChat.avater,
    	message:message,
    	time:now
    }
    if(chatsWith.find({ username: curChat.username }).value()){
    	chatsWith.find({ username: curChat.username }).get('histories').push(oneHistory).write();
    }else{
    	chatsWith.push({username:curChat.username,histories:[oneHistory] }).write();
    }

  });
  $(document).on('keyup','.chats-input-text', function(e){
  	//按回车
  	if(e.which === 13){
  		$(".chats-input-btn").click();
  		e.preventDefault();
  		e.stopPropagation();
  		return false
  	}
  });
};
export default chatsInputEvent;
