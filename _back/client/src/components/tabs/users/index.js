import template from "template";
import "./index.less";


var source = "<li class=\"users-group\">"
+  "<div class=\"users-none\">暂无用户</div>"
+"</li>";


var render = template.compile(source);

const renderUsers = (tabs)=>{
  var usersHtml = render();
  console.log("renderUsersGroup");
  tabs.append(usersHtml);
};

export default renderUsers;
