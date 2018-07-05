const getChats = (curChat, cb)=>{
	console.log("getChats");
	if(curChat.isRoom){
		var groupName = 'roomChats';
		var findKey = {roomname:curChat.username}
	}else{
		var groupName = 'chats';
		var findKey = {username:curChat.username}
	}
	localforage.getItem(groupName,(err, chats)=>{
		var findVal =  _.find(chats,findKey);
		cb(findVal);
	});
}

const setChats =(curChat, cb)=>{
	if(curChat.inChat === "false"){
		var item = curChat.isRoom ? "roomChats":"chats";
		var pushData = curChat.isRoom ?{roomname:curChat.username, avater:curChat.avater, lastMess:''}:{username:curChat.username, avater:curChat.avater, lastMess:''}
		localforage.getItem(item,(err, chats)=>{
			chats = chats || [];
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
