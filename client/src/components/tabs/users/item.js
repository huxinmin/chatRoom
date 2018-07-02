import template from "template";
import "./index.less";


var source = "<div class=\"users-item\" data-online={{online}} data-inChats={{inChats}}>"
+"<img class=\"users-item-avater\" src={{avater}}>"
+"<p class=\"users-item-name\">{{username}}</p>"
+"</div>";


var render = template.compile(source);

const renderUsersItem = (usersGroup, data)=>{
  var itemHtml = render(data);
  usersGroup.append(itemHtml);
};

export default renderUsersItem;
