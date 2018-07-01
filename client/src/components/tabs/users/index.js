import template from 'template';
import './index.less';


var source = '<li class="users-group">'
+'users-group'
+'</li>'


const data = {

}
var render = template.compile(source);
var usersHtml = render(data);

const renderUsers = (tabs)=>{
	tabs.append(usersHtml);
}

export default renderUsers