import renderHistoryItem from "../chatsWin/historyItem";
import {server,} from "../../config.js";
import {emitMessagesSocket, emitRoomMessagesSocket,} from "../../socket/emit";
import db from '../../utils/db';
import {hisLimit, createId} from '../../utils/utils';

const chatsInputEvent = ()=>{
  $(document).on("click", ".chats-input-btn", function(){
  	function scrollAuto(){
			$(".chats-window").scrollTop($(".chats-win-history-group").height())
		}
    const inputCont = $(".chats-input-text");
    const message = inputCont.html().replace(/<div><br><\/div>/ig,'');
    if(!message || message.length===0){ return; }
    const chatsWin = $(".chats-win-history-group");
    const now = moment().format("MM-DD HH:mm");
    const id = createId();
    const data = [{isMine:"true", message:message, time:now, avater:server+"/"+window.locals.mine.avater,id:id},];
    renderHistoryItem(chatsWin, data);
    inputCont.html("");
    const curChat = window.locals.curChat;
    var socketMessages = {sender:window.locals.mine,receiver:curChat.username,message:message,time:now,id:id};
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
    	history.find({ username: curChat.username }).assign({lastMess:message,time:now, id:id}).write()
    }else{
    	history.push({username:curChat.username,avater:curChat.avater,lastMess:message,time:now, id:id}).write()
    }
    var chatsWith = db.get('chatsWith');
    const oneHistory = {
    	sender:window.locals.mine.username,
    	senderAvater:window.locals.mine.avater,
    	receiver:curChat.username,
    	receiverAvater:curChat.avater,
    	message:message,
    	time:now,
    	id:id
    }
    if(chatsWith.find({ username: curChat.username }).value()){
    	var chatsWithHis = chatsWith.find({ username: curChat.username }).get('histories');
    	chatsWithHis.push(oneHistory).write();
    	console.log("drop")
    	//如果历史记录超过100条则去掉第一条
    	if(chatsWithHis.size().value()>hisLimit){
    		chatsWithHis.shift().write()
    	}
    }else{
    	chatsWith.push({username:curChat.username,histories:[oneHistory] }).write();
    }
    scrollAuto();

  });
  $(document).on('keyup','.chats-input-text', function(e){
  	e.preventDefault();
  	e.stopPropagation();
  	//按回车
  	if(e.which === 13){
  		$(".chats-input-btn").click();
  		return false
  	}
  });
};
export default chatsInputEvent;
