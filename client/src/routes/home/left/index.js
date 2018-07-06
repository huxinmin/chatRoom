import template from "template";
import "./index.less";
import userSvg from "../../../svg/user";
import chatSvg from "../../../svg/chat";
import groupSvg from "../../../svg/group";
import settingSvg from "../../../svg/setting";
import logoutSvg from '../../../svg/logout';

import leftEvent from "./events";


var source = "<li class='left'>"
+"<div class=\"mine\"><img src''></div>"
+"<ul class=\"menu-group\">"
+  "{{each menus val i}}"
+    "<li class='menu-item' data-type={{val.type}} title={{val.title}}>{{@ val.icon}}</li>"
+  "{{/each}}"
+"</ul>"
+"<div class='bottom-btns-group'>"
+"<div title='退出' class=\"logout-btn\">"+logoutSvg+"</div>"
+"<div title='设置' class=\"setting-btn\">"+settingSvg+"</div>"
+"</div>"
+"</li>";


const data = {
  menus:[
    {type:"chats",icon: chatSvg, title:"聊天"},
    {type:"users",icon:userSvg, title:"用户"},
    {type:"rooms",icon:groupSvg, title:"群聊"}
  ]
};
var render = template.compile(source);

var leftHtml = render(data);

const renderLeft = (home)=>{
  home.append(leftHtml);
  leftEvent();
};

export default renderLeft;
