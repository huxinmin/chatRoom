import template from "template";
import "./index.less";
import renderRoomsItem from "./item";

var source = "<li class=\"rooms-group\">"
+  "<div class=\"rooms-none\">暂无群组</div>"
+"</li>";



var render = template.compile(source);

const renderRooms = (tabs)=>{
  var roomsHtml = render();
  console.log("renderRooms");
  tabs.append(roomsHtml);
};

export default renderRooms;
