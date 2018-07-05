const judgeCurChatIsInChats = (curChat, cb)=>{
  if(curChat.isRoom){
  	localforage.getItem("roomChats").then((err, roomChats)=>{
    	cb(_.includes(roomChats,{roomname:curChat.username}));
  	});
  }else{
  	localforage.getItem("chats").then((err, chats)=>{
    	cb(_.includes(roomChats,{username:curChat.username}));
  	});
  }

}

export default judgeCurChatIsInChats
