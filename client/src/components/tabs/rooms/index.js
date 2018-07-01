import template from 'template';
import './index.less';


var source = '<li class="rooms-group">'
+'rooms-group'
+'</li>'


const data = {

}
var render = template.compile(source);
var roomsHtml = render(data);

const renderRooms = (tabs)=>{
	tabs.append(roomsHtml);
}

export default renderRooms