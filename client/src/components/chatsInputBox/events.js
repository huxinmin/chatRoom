import $ from "jquery";
import renderHistoryItem from "../chatsWin/historyItem";
import {updateChatsWith,} from "../../utils/chatsWith";
import {server,} from "../../config.js";

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
    if(!curChat.isRoom){
      const itemName = "chats_"+curChat.username;
      updateChatsWith(itemName, {isMine:"true",message:message,time:now,});
    }else{
      const itemName = "roomChats_"+curChat.username;
      updateChatsWith(itemName, {isMine:"true",message:message,time:now, avater:window.locals.mine.avater, username:window.locals.mine.username,});
    }
  });
};
export default chatsInputEvent;
