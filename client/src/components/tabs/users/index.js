import template from "template";
import "./index.less";
import renderUsersItem from "./item";

var source = "<li class=\"users-group\">"
+"{{if !users.length}}"
+  "<div class=\"users-none\">暂无用户</div>"
+"{{/if}}"
+"</li>";

localforage.getItem('chats').then((chats, err)=>{
	var users = window.locals.users;
	//将username在chats中的用户增加一个熟悉inChats为true,如果不在则值为false
	users = _.map(users,(user)=>{
		console.log(user)
		if(_.find(chats,{username:user.username})){
			return Object.assign(user, {inChats:true});
		}else{
			return Object.assign(user, {inChats:false});
		}
	});
	console.log(users)
});

const data = {
  users:[
    {username:"用户名",avater:"/assets/images/avater.jpg",online:false,inChats:false,},
    {username:"用户名",avater:"/assets/images/avater.jpg",online:true,inChats:true,},
  ],
};
var render = template.compile(source);
var usersHtml = render(data);

const renderUsers = (tabs)=>{
  tabs.append(usersHtml);
  const usersGroup = $(".users-group");
  data.users.forEach((item)=>{
    renderUsersItem(usersGroup,item);
  });
};

export default renderUsers;
