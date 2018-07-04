const getChatHistories = (curChat, cb)=>{
	console.log("getChatHistories");
	if(curChat.isRoom){
		var groupName = 'roomChats';
		var itemName = 'roomname';
	}else{
		var groupName = 'chats';
		var itemName = 'username';
	}
	localforage.getItem('chats',(chats, err)=>{
		/** 这里应该不是获取getItem('chats')，而是获取对应的chats_$username或者roomChats_$roomname
		  * 然后返回一个对象，具有username也就是聊天窗口头部的用户名,histories历史消息
		  * 未完成待做
		  *
		  */
		var findVal =  _.find(chats,{username:curChat.username});
		var data = Object.assign(curChat, findVal);
		cb(data);
	});
}


export default getChatHistories
