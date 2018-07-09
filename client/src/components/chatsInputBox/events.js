import $ from "jquery";
import renderHistoryItem from "../chatsWin/historyItem";
import {updateChatsWith,} from "../../utils/chatsWith";
import {server,} from "../../config.js";
import {emitMessagesSocket, emitRoomMessagesSocket} from '../../socket/emit';

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
    var socketMessages = {sender:window.locals.mine,receiver:curChat.username,message:message,time:now}
    console.log('发送消息')
    if(!curChat.isRoom){
      const itemName = "chats_"+curChat.username;
      updateChatsWith(itemName, {isMine:"true",message:message,time:now,});
      emitMessagesSocket(socketMessages);
    }else{
    	emitRoomMessagesSocket(socketMessages);
      const itemName = "roomChats_"+curChat.username;
      updateChatsWith(itemName, {isMine:"true",message:message,time:now, avater:window.locals.mine.avater, username:window.locals.mine.username,});
    }
  });
};
export default chatsInputEvent;
