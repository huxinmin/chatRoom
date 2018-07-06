import {setCookie} from '../utils/cookie';
import {server} from '../config.js';

const logoutAjax = ()=>{
	$.ajax({
		type: "post",
		dataType: "json",
		url: server+"/logout",
		xhrFields: {
      withCredentials: true
    },
    crossDomain: true
	});
	setCookie('isLogin',false);
	page.redirect("/login");
}

export default logoutAjax
