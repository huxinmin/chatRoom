import template from "template";
import "./index.less";
import renderChatsInputBox from "../../../components/chatsInputBox";

/** 没有选择聊天时候显示暂无聊天
  * 有聊天则切换到聊天界面
  * 未完成待做
  */
var source = "<li class=\"right\">"
+"<div class=\"chats-window-none\">暂无聊天对象</div>"
+"<div class=\"chats-window-wrapper\"></div>"
+"</li>";

var render = template.compile(source);
var rightHtml = render();

const renderRight = (home)=>{
  home.append(rightHtml);
  const chatsWindowWrapper = $(".chats-window-wrapper");
  renderChatsInputBox(chatsWindowWrapper);
};

export default renderRight;
