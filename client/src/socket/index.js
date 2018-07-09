import createNotification from '../components/notification';
import {server} from "../config.js";
import renderHistoryItem from "../components/chatsWin/historyItem";
import {updateChatsWith} from '../utils/chatsWith';
import {setChats,getChats} from "../utils/chats";
import renderChatsItem from '../components/tabs/chats/item';

const socket = io({autoConnect:false});

socket.on("recLogin", function(data) {
  createNotification(data.username, '上线了', server+'/'+data.avater);
  console.log(data);
});

socket.on("recLogout", function(data) {
  console.log(data);
});

socket.on('recMessages', (data)=>{
	console.log('recMessages');
	console.log(data);
	//如果发送者与当前curChat的用户名相同，也就是聊天框是激活的，则创建聊天历史记录，并改变localforage数据，否则只改变数据
	if(window.locals.curChat.username === data.sender.username){
		const chatsWin = $(".chats-win-history-group");
		const history = [{isMine:"false", message:data.message, time:data.time, avater:server+"/"+data.sender.avater,},];
		renderHistoryItem(chatsWin, history);
	}
	updateChatsWith('chats_'+data.sender.username,{isMine:'false',message:data.message,time:data.time});
	//如果是第一次聊天，也就是inChat为false,则需要创建chats对话框
	getChats('chats',(chats)=>{
		var inChat
		if(_.find(chats,{username:data.sender.username})){
			inChat = "true"
		}else{
			inChat = "false"
			const chatsGroup = $(".chats-group");
			renderChatsItem(chatsGroup,{
				username:data.sender.username,
				unread:1,
				active:"false",
				type:"user",
				online:data.sender.online,
				avater:server+"/"+data.sender.avater,
				lastMes:data.message
			});
		}
		setChats({isRoom:false,username:data.sender.username,avater:data.sender.avater,inChat:inChat});
	});
});

socket.on('recRoomMessages', (data)=>{
	console.log('recRoomMessages');
	console.log(data);
});

export default socket;
