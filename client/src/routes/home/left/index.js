import template from "template";
import "./index.less";
import userSvg from "../../../svg/user";
import chatSvg from "../../../svg/chat";
import groupSvg from "../../../svg/group";
import settingSvg from "../../../svg/setting";

import leftEvent from "./events";


var source = "<li class={{className}}>"
+"<div class=\"mine\"><img src={{mine.avater}}></div>"
+"<ul class=\"menu-group\">"
+  "{{each menus val i}}"
+    "<li class='menu-item' data-type={{val.type}} title={{val.title}}>{{@ val.icon}}</li>"
+  "{{/each}}"
+"</ul>"
+"<div class=\"setting-btn\">{{@ setting.icon}}</div>"
+"</li>";


const data = {
  className:"left",
  mine:{
    username:"huxinmin",
    avater:"/assets/images/avater.jpg",
  },
  menus:[
    {type:"chats",icon: chatSvg, title:"聊天"},
    {type:"users",icon:userSvg, title:"用户"},
    {type:"rooms",icon:groupSvg, title:"群聊"},
  ],
  setting:{icon:settingSvg,},
};
var render = template.compile(source);

var leftHtml = render(data);

const renderLeft = (home)=>{
  home.append(leftHtml);
  leftEvent();
};

export default renderLeft;