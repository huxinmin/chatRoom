import template from "template";
import "./index.less";

import renderChatsItem from "./item";

var source = "<li class=\"chats-group active\">"
+  "<div class=\"chats-none\">暂无消息</div>"
+"</li>";

var render = template.compile(source);

/** 像users和rooms一样，在这里只渲染一个group，然后在别的地方获取数据，再渲染items，并隐藏chats-none
  * 未完成待做
  *
  */
const renderChats = (tabs)=>{
	var chatsHtml = render();
	tabs.append(chatsHtml);
	const chatsGroup = $(".chats-group");
	getChatsRenderChats("chats", "username", {type:"user",online:""});
	getChatsRenderChats("roomChats", "roomname",{type:"room",online:"none"});
	function getChatsRenderChats(itemName, typename,  assignData){
		localforage.getItem(itemName).then((chats, err)=>{
			chats = chats || [];
			if(chats && chats.length>0) $(".chats-none").hide()
  		chats.forEach((item)=>{
  			const renderData = Object.assign(assignData,{active:"false", unread:0, username:item[typename]},item);
    		renderChatsItem(chatsGroup,renderData);
  		});
		});
	}
};

export default renderChats;
