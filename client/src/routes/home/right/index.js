import template from "template";
import "./index.less";

import renderChatsInputBox from "../../../components/chatsInputBox";
import renderChatsWin from "../../../components/chatsWin";


/** 没有选择聊天时候显示暂无聊天
  * 有聊天则切换到聊天界面
  * 未完成待做
  */
var source = "<li class=\"right\">"
+"<div class=\"chats-window-none\" style=\"display:none\">暂无聊天对象</div>"
+"<div class=\"chats-window-wrapper\"></div>"
+"</li>";

var render = template.compile(source);
var rightHtml = render();

const renderRight = (home)=>{
  home.append(rightHtml);
  const chatsWindowWrapper = $(".chats-window-wrapper");
  /** 初始化的时候可以不用渲染聊天输入框，和聊天窗口，这里是为了先写样式，所以没有传入数据
    * 等待后面点击聊天生成聊天界面的时候再渲染，要传入数据
    * 后期删除这里，下面3行，和import的两行
  */
  const data = {username:"聊天对象",histories:[
    {username:"用户名",isMine:"false",avater:"/assets/images/avater.jpg",message:"这是聊天发送的消息这是聊天发送的消息这是聊天发送的消息这是聊天发送的消息这是聊天发送的消息这是聊天发送的消息", time:"08-05 09:01",},
    {username:"我的用户名",isMine:"true",avater:"/assets/images/avater.jpg",message:"这是聊天发送的消息这是聊天发送的消息这是聊天发送的消息这是聊天发送的消息这是聊天发送的消息这是聊天发送的消息", time:"08-05 09:01",},
  ], avater:"/assets/images/avater.jpg",};
  renderChatsWin(chatsWindowWrapper,data);
  renderChatsInputBox(chatsWindowWrapper);
};

export default renderRight;
