import template from 'template';

import './index.less';
import SVG from './svg.js';
import './animation.js';
import loginEvent from'./event';
import loadingLogin from './loading'

var source = '<div class={{loginClass}}>'
+      SVG
+      '<div class="login-form">'
+        '{{each inputs val }}'
+           '<div class="login-from-group">'
+              '<label for={{val.id}}>{{val.val}}</label>'
+              '<input autocomplete="off" type={{val.type}} id={{val.id}}>'
+           '</div>'
+        '{{/each}}'
+        '<input type="submit" id={{btn.id}} value={{btn.val}}>'
+      '</div>'
+'</div>'


const data = {
	loginClass:'login-container',
	inputs:[{id:"username", val:"用户名", type:"text"},{id:"password", val:"密码", type:"password"}],
	btn:{
		id:'login', val:"登录"
	}
}
var render = template.compile(source);
var loginHtml = render(data);

const renderLogin = (app)=>{
	app.html(loginHtml);
	loadingLogin('.'+data.loginClass);
	loginEvent('#'+data.btn.id);
}

export default renderLogin