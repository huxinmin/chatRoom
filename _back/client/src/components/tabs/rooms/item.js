import template from "template";
import "./index.less";


var source = "<div class=\"rooms-item\" data-inChat={{inChat}}>"
+"<img class=\"rooms-item-avater\" src={{avater}}>"
+"<p class=\"rooms-item-name\">{{roomname}}</p>"
+"</div>";


var render = template.compile(source);

const renderRoomsItem = (roomsGroup, data)=>{
  $(".rooms-none").hide();
  var itemHtml = render(data);
  roomsGroup.append(itemHtml);
};

export default renderRoomsItem;
