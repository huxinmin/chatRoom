import swal from 'sweetalert';
import {setCookie} from '../utils/cookie';
import dataURLtoBlob from '../utils/dataURLtoBlob';

const registerAjax = ()=>{
	var data = new FormData();
	data.append("username", $(".register-name").val());
	data.append("password", $(".register-password").val());
	const imgBlob = dataURLtoBlob($(".register-avater").attr("src"));
	data.append("avater", imgBlob);
	$.ajax({
		type: "post",
		dataType: "json",
		url: window.locals.serverHost+"/register",
		xhrFields: {
      withCredentials: true
    },
    contentType: false,
    processData:false,
    crossDomain: true,
		data: data
	}).done((data)=>{
		done(data);
	}).fail((err)=>{
		fail("登录失败");
	});
	function done(data){
		if(data.auth){
			window.locals.mine = data.mine;
    	setCookie('isLogin',true);
			swal({
				button:false,
  			text: data.message,
  			icon: "success",
  			timer: 2000
			}).then(()=>{
				page.redirect("/home");
			});
		}else{
			fail(data.message);
		}
	}
	function fail(message){
		swal({
   		button: {
    		text: "确定",
  		},
  		text: message,
  		icon: "error",
  		timer: 3000
		})
	}
}

export default registerAjax
