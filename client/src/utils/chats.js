const getChats = (type, cb)=>{
  console.log("getChats");
  localforage.getItem(type,(err, chats)=>{
    cb(chats);
  });
};

const setChats =(curChat, cb)=>{
  if(curChat.inChat === "false"){
    var item = curChat.isRoom ? "roomChats":"chats";
    var pushData = curChat.isRoom ?{roomname:curChat.username, avater:curChat.avater, lastMess:"",}:{username:curChat.username, avater:curChat.avater, lastMess:"",};
    localforage.getItem(item,(err, chats)=>{
      chats = chats || [];
      chats.push(pushData);
      localforage.setItem(item, chats, function(err, val){
        if (err) throw Error("创建聊天出错了");
        cb(val);
      });
    });
  }
};

export {getChats,setChats,};
