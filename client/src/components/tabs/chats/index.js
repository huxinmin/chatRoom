import template from 'template';
import './index.less';


var source = '<li class="chats-group">'
+'chats-group'
+'</li>'


const data = {

}
var render = template.compile(source);
var chatsHtml = render(data);

const renderChats = (tabs)=>{
	tabs.append(chatsHtml);
}

export default renderChats