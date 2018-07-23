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
  /** 未完待做，渲染chatsitem
    *
    *
    */
};

export default renderChats;
