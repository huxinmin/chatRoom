import swal from 'sweetalert';
import {addUsersInChatsPro, addRoomsInChatsPro} from '../utils/addInChatsPro';
import {setCookie} from '../utils/cookie';

const homeOnload = ()=>{
	$.ajax({
		type: "get",
		dataType: "json",
		xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
		url: window.locals.serverHost+"/home"
	}).done((data)=>{
		done(data);
	}).fail((err)=>{
		onloadFail();
	});
	function done(data){
		if(data){
			window.locals.mine = data.mine;
			addRoomsInChatsPro(data.rooms);
			addUsersInChatsPro(data.users);
		}else{
			onloadFail();
		}
	 }
	function onloadFail(messages){
		swal({
			button: {
				text: "确定",
			},
			text: "数据获取失败",
			icon: "error",
			timer: 3000
		}).then(()=>{
			setCookie('isLogin',false);
			page.redirect("/login");
		});
	}
}
export default homeOnload
