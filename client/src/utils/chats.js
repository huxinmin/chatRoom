const getChats = (curChat, cb)=>{
	console.log("getChatHistories");
	if(curChat.isRoom){
		var groupName = 'roomChats';
		var itemName = 'roomname';
	}else{
		var groupName = 'chats';
		var itemName = 'username';
	}
	localforage.getItem('chats',(err, chats)=>{
		/** 这里应该不是获取getItem('chats')，而是获取对应的chats_$username或者roomChats_$roomname
		  * 然后返回一个对象，具有username也就是聊天窗口头部的用户名,histories历史消息
		  * 未完成待做
		  *
		  */
		var findVal =  _.find(chats,{username:curChat.username});
		var data = Object.assign({},findVal, curChat);
		cb(data);
	});
}

const setChats =(curChat, cb)=>{
	if(curChat.inChat === "false"){
		var item = curChat.isRoom ? "roomChats":"chats";
		var pushData = curChat.isRoom ?{roomname:curChat.username, avater:curChat.avater, lastMess:''}:{username:curChat.username, avater:curChat.avater, lastMess:''}
		localforage.getItem(item,(err, chats)=>{
			chats.push(pushData);
			localforage.setItem(item, chats, function(err, val){
				if (err) throw Error('创建聊天出错了')
				cb(val);
			});
		});
		var chatsWithItem = curChat.isRoom ? 'roomChats_'+curChat.username :'chats_'+curChat.username;

	}
}

export {getChats,setChats}
