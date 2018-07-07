import {setCookie} from '../utils/cookie';
import {server, ajaxCrossDomainSettings} from '../config.js';

const logoutAjax = ()=>{
	const options = Object.assign({
		type: "post",
		dataType: "json",
		url: server+"/server/logout"
	}, ajaxCrossDomainSettings);
	$.ajax(options);
	setCookie('isLogin',false);
	page.redirect("/login");
}

export default logoutAjax
