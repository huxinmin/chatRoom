import template from 'template';
import './index.less';
import renderUsersItem from './item';

var source = '<li class="users-group">'
+'{{if !users.length}}'
+  '<div class="users-none">暂无用户</div>'
+'{{/if}}'
+'</li>'


const data = {
	users:[
		{username:"用户名",avater:"/assets/images/avater.jpg",online:false,inChats:false},
		{username:"用户名",avater:"/assets/images/avater.jpg",online:true,inChats:true}
	]
}
var render = template.compile(source);
var usersHtml = render(data);

const renderUsers = (tabs)=>{
	tabs.append(usersHtml);
	const usersGroup = $(".users-group");
	data.users.forEach((item)=>{
		renderUsersItem(usersGroup,item);
	});
}

export default renderUsers
