import template from "template";
import "./index.less";
import renderToolEmoji from "./emoji";
import renderToolFile from "./file";
import renderToolTorrent from "./torrent";


var source = "<div class=\"chats-input-tools\"></div>";

var render = template.compile(source);

const renderChatsInputTools = (chatsInputBox)=>{
  var toolsHtml = render();
  chatsInputBox.prepend(toolsHtml);
  const chatsInputTools = $(".chats-input-tools");
  renderToolEmoji(chatsInputTools);
  renderToolFile(chatsInputTools);
  renderToolTorrent(chatsInputTools);
};

export default renderChatsInputTools;
