import template from "template";
import "./index.less";

import renderHistoryItem from "./historyItem";

var source = "<div class=\"chats-window\" data-username={{username}}>"
+"<div class=\"chats-win-user\">{{username}}</div>"
+"<div class=\"chats-win-history-group\"></div>"
+"</div>";

var render = template.compile(source);

const renderChatsWin = (chatsWindowWrapper, data)=>{
  var chatsWinUserHtml = render(data);
  chatsWindowWrapper.append(chatsWinUserHtml);
  const chatsWin = $(".chats-win-history-group");
  renderHistoryItem(chatsWin, data.histories);
};

export default renderChatsWin;
