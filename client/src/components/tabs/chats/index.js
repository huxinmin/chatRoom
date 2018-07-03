import template from "template";
import "./index.less";

import renderChatsItem from "./item";

var source = "<li class=\"chats-group active\">"
+"{{if !chats.length}}"
+  "<div class=\"chats-none\">暂无消息</div>"
+"{{/if}}"
+"</li>";

const data = {
  chats:[
    {username:"用户聊天",avater:"/assets/images/avater.jpg",unread:1, active:false, lastMes:"你好啊，这是最后的一次对话的缩略图", type:"user",online:false,},
    {username:"群聊聊天",avater:"/assets/images/avater.jpg",unread:1, active:true, lastMes:"你好啊，这是最后的一次对话的缩略图", type:"room", onLine:"none",},
  ],
};
var render = template.compile(source);


const renderChats = (tabs)=>{
	localforage.getItem('chats').then((val, err)=>{
		val = val || [];
		var chatsHtml = render({chats:val});
		tabs.append(chatsHtml);
  	const chatsGroup = $(".chats-group");
  	val.forEach((item)=>{
    	renderChatsItem(chatsGroup,item);
  	});
	});
};

export default renderChats;
