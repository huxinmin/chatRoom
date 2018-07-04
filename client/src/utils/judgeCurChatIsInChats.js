const judgeCurChatIsInChats = (curChat, cb)=>{
  if(curChat.isRoom){
  	localforage.getItem("roomChats").then((roomChats, err)=>{
    	cb(_.includes(roomChats,{roomname:curChat.username}));
  	});
  }else{
  	localforage.getItem("chats").then((chats, err)=>{
    	cb(_.includes(roomChats,{username:curChat.username}));
  	});
  }

}

export default judgeCurChatIsInChats
