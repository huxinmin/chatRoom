import renderChatsWin from "../components/chatsWin";
import renderChatsItem from "../components/tabs/chats/item";
import swal from "sweetalert";
import db from './db';
import {server,} from "../config.js";

window.locals = {
  _mine:{},
  _curChat:{},
  get mine(){
  	return this._mine;
  },
  set mine(data){
  	if(!_.isPlainObject(data)){
  		throw TypeError("locals.mine 赋值必须为一个普通对象");
  	}
  	this._mine = data;
  	const avater = server +"/" +data.avater;
  	$(".mine img").attr("src", avater);
  },
  get curChat(){
  	return this._curChat;
  },
  set curChat(data){
  	if(!_.isPlainObject(data)){
  		throw TypeError("locals.curChat 赋值必须为一个普通对象");
  	}
  	this._curChat = data;
  	if(data === null || data.length ===0){
  		$(".chats-window-none").show();
  		$(".chats-input-box").hide();
  		return;
  	}else{
  		$(".chats-window-none").hide();
  		$(".chats-input-box").show();
  	}
    if(data.online === "false"){
    	swal({
   			button: {
    			text: "确定",
  			},
  			text: "当前用户不在线，您只被允许发送3条离线消息",
  			icon: "warning",
  			timer: 3000,
      });
    }
    $(".chats-item").attr("data-active", "false");
    const chatsWindowWrapper = $(".chats-window-wrapper");
    const chatsGroup = $(".chats-group");
    //在聊天列表中，不重新创建聊天框，只跳转激活，并获取历史记录
    console.log("改变windows curChat",data)
    if(data.inChat === "true"){
      $(".chats-item[data-username='"+data.username+"']").attr("data-active", "true");
   		const chatsWith = db.get("chatsWith").find({username:data.username}).value();
   		var histories = [];
   		if(chatsWith && chatsWith.histories){
   			histories = chatsWith.histories
   			histories = histories.map((item)=>{
   				if(item.sender === window.locals.mine.username){
   					return Object.assign({isMine:'true', avater:item.senderAvater}, item)
   				}
   				return Object.assign({isMine:'false', avater:item.receiverAvater}, item)
   			})
   		}
   		renderChatsWin(chatsWindowWrapper,Object.assign({histories:histories}, data));
    }else{
   		//不在聊天列表中，重新创建聊天框，并跳转激活，不用获取历史记录，但是需要设置历史记录
   		var itemData = Object.assign({
   			unread:0,
   			type: data.isRoom ? "room":"user",
   			active:"true",
   			lastMes:"",
   		},data);
   		renderChatsItem(chatsGroup,itemData);
      //然后还要打开聊天窗口和输入界面
      renderChatsWin(chatsWindowWrapper,Object.assign({histories:[],}, data));
    }
    $(".menu-item[data-type='chats']").click();
    /** 设置本地或者更新chats以及chats_$username
     * 亦或是roomschats以及roomchats_$roomname
     * 未完待做
     */
  },
};

