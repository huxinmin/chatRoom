import template from 'template';
import './index.less';

import renderChats from './chats';
import renderRooms from './rooms';
import renderUsers from './users';
import tabsEvent from './events';

var source = '<ul class="tabs-group"></ul>'

var render = template.compile(source);
var tabsHtml = render();

const renderTabs = (middle)=>{
	middle.append(tabsHtml);
	const tabs = $(".tabs-group");
	renderChats(tabs);
	renderUsers(tabs);
	renderRooms(tabs);
	tabsEvent();
}

export default renderTabs
