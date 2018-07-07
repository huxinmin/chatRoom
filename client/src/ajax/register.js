import swal from 'sweetalert';
import {setCookie} from '../utils/cookie';
import dataURLtoBlob from '../utils/dataURLtoBlob';
import {server, ajaxCrossDomainSettings} from '../config.js';
import homeOnload from './homeOnload';

const registerAjax = ()=>{
	var data = new FormData();
	data.append("username", $(".register-name").val());
	data.append("password", $(".register-password").val());
	const imgBlob = dataURLtoBlob($(".register-avater").attr("src"));
	data.append("avater", imgBlob);
	const options = Object.assign({
		type: "post",
		dataType: "json",
		url: server+"/server/register",
    contentType: false,
    processData:false,
		data: data
	},ajaxCrossDomainSettings);

	$.ajax(options).done((data)=>{
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
				homeOnload();
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
