const getChats = (type, cb)=>{
  console.log("getChats");
  localforage.getItem(type,(err, chats)=>{
    cb(chats);
  });
};

const setChats =(curChat, lastMess, cb)=>{
  console.log("setChats");
  cb = cb || function(){};
  var item = curChat.isRoom ? "roomChats":"chats";
  if(curChat.inChat === "false"){
    var pushData = curChat.isRoom ?{roomname:curChat.username, avater:curChat.avater, lastMess:"",}:{username:curChat.username, avater:curChat.avater, lastMess:"",};
    localforage.getItem(item,(err, chats)=>{
      chats = chats || [];
      chats.push(pushData);
      localforage.setItem(item, chats, function(err, val){
        if (err) throw Error("创建聊天出错了");
        cb(val);
      });
    });
  }else{
  	localforage.getItem(item,(err, chats)=>{
  		if(curChat.isRoom){
  			var index = _.findIndex(chats,{roomname:curChat.username,});
  		}else{
  			var index = _.findIndex(chats,{username:curChat.username,});
  		}
  		chats[index].lastMess = lastMess;
      localforage.setItem(item, chats, function(err, val){
        if (err) throw Error("创建聊天出错了");
        cb(val);
      });
    });
  }
};

export {getChats,setChats,};
