import template from 'template';
import './index.less';
import renderRoomsItem from './item';

var source = '<li class="rooms-group">'
+'{{if !rooms.length}}'
+  '<div class="rooms-none">暂无群组</div>'
+'{{/if}}'
+'</li>'


const data = {
	rooms:[
		{roomname:'群聊名',avater:'/assets/images/avater.jpg',inChat:false},
		{roomname:'群聊名',avater:'/assets/images/avater.jpg',inChat:true}
	]
}
var render = template.compile(source);
var roomsHtml = render(data);

const renderRooms = (tabs)=>{
	tabs.append(roomsHtml);
	const roomsGroup = $(".rooms-group");
	data.rooms.forEach((item)=>{
		renderRoomsItem(roomsGroup,item);
	});
}

export default renderRooms
