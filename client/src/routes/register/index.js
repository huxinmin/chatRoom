import "./index.less";
import regEvent from"./events";
import loadingRegister from './loading';

var source = "<div class='register-wrapper'>"
+  "<label class='register-label' for='avaterInput'>"
+     "<img src='/assets/images/avater.jpg' class='register-avater'>"
+     "<input id='avaterInput' type='file'>"
+     "<span class='choose-avater'>选择头像</span>"
+ "</label>"
+"<form class='register-form'>"
+  "<div class='register-form-group'><input class='register-name' type='text' placeholder='请输入用户名'></div>"
+  "<div class='register-form-group'><input class='register-password' type='password' placeholder='请输入密码'></div>"
+  "<div class='register-form-group'><input class='register-cfPassword' type='password' placeholder='请再次输入密码'></div>"
+  "<div class='register-form-group'><input class='register-confirm-btn' type='button' value='注册'></div>"
+"</form>"
+"<a class='register-href' href='/chatRoom/login'>已有账号？立即登录</a>"
+"</div>";


var render = template.compile(source);
var regHtml = render();

const renderRegister = (app)=>{
  app.html(regHtml);
  loadingRegister(".register-wrapper");
  regEvent();
};

export default renderRegister;
