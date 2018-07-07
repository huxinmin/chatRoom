import {server,} from "../config.js";

const createChatsWith = (itemName)=>{
  console.log("setChatsWith");
  localforage.setItem(itemName,[]);
};

const dropChatsWith = (itemName)=>{
  localforage.setItem(itemName,null);
};

const getChatsWith = (data, cb)=>{
  console.log("getChatWithHistories");
  if(data.isRoom){
    var groupName = "roomChats_"+data.username;
  }else{
    var groupName = "chats_"+data.username;
  }
  localforage.getItem(groupName,(err, chatsWithHistories)=>{
    //如果是和用户聊天，还需要加上username和avater
    if(!data.isRoom){
      chatsWithHistories = _.map(chatsWithHistories,(item)=>{
        if(item.isMine === "true"){
          var assignData = _.pick(window.locals.mine,["username","avater",]);
        }else{
          var assignData = _.chain(window.locals.users).find({username:data.username,}).pick(["username","avater",]).value();
        }
        assignData.avater = server + "/"+ assignData.avater;
        return Object.assign(assignData, item);
      });
    }
    cb(chatsWithHistories);
  });
};
/** 需要限制数量，不能超过100个，超过则删除第一个，尾部增加一个
	*
	*
	*/
const updateChatsWith = (itemName, val)=>{
  const limit = 100;
  localforage.getItem(itemName,(err, items)=>{
    if(items.length >= limit){
      items.shift();
    }
    items.push(val);
    localforage.setItem(itemName,items);
  });
};

export {createChatsWith, getChatsWith, updateChatsWith,};
