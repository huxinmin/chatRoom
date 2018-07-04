import template from "template";
import "./index.less";


var source = "<div class=\"chats-item\" data-username={{username}} data-unread={{unread}} data-active={{active}} data-type={{type}} data-onLine={{onLine}}>"
+"<img class=\"chats-item-avater\" src={{avater}}>"
+"<div class=\"chats-item-info\">"
+  "<div class=\"chats-item-info-top\">"
+    "<span class=\"chats-item-username\">{{username}}</span>"
+    "<span class=\"chats-item-unread\">{{unread}}</span>"
+  "</div>"
+  "<p class=\"chats-item-info-bottom\">{{lastMes}}</p>"
+"</div>"
+"</div>";


var render = template.compile(source);

const renderChatsItem = (chatsGroup, data)=>{
  var itemHtml = render(data);
  chatsGroup.append(itemHtml);
  $(".chats-none").hide();
};

export default renderChatsItem;
