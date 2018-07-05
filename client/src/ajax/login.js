import swal from 'sweetalert';
import {addUsersInChatsPro, addRoomsInChatsPro} from '../utils/addInChatsPro';
import {setCookie} from '../utils/cookie';

const loginAjax = (data)=>{
	$.ajax({
		type: "post",
		dataType: "json",
		url: window.locals.serverHost+"/login",
		xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
		data: data
	}).done((data)=>{
		done(data);
	}).fail((err)=>{
		loginFail("登录失败");
	});
  function done(data){
    if(data.auth){
    	window.locals.mine = data.mine;
    	addRoomsInChatsPro(data.rooms);
    	addUsersInChatsPro(data.users);
    	setCookie('isLogin',true);
    	page.redirect("/home");
    }else{
    	loginFail(data.message);
    }
   }
  function loginFail(messages){
   	swal({
   		button: {
    		text: "确定",
  		},
  		text: messages,
  		icon: "error",
  		timer: 3000
		})
  }
}
export default loginAjax
