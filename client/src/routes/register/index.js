import "./index.less";
import regEvent from"./events";

var source = "<div class='register-wrapper' style='width:200px'>"
+  "<label for='avaterInput' style='display:block; overflow:hidden;width:100px;height:100px;border-radius:50%;position:relative;'>"
+ "<img style='width:100%' src='/assets/images/avater.jpg' class='register-avater'><input id='avaterInput' type='file' style='display:none;'>"
+ "<span style='position:absolute;left:10px;top:30px;'>选择头像</span></label>"
+"<form class='register-form'>"
+  "<div class='register-form-group'><input class='register-name' type='text' placeholder='请输入用户名'></div>"
+  "<div class='register-form-group'><input class='register-password' type='password' placeholder='请输入密码'></div>"
+  "<div class='register-form-group'><input class='register-cfPassword' type='password' placeholder='请再次输入密码'></div>"
+"</form>"
+"</div>";


const data = {

};
var render = template.compile(source);
var regHtml = render(data);

const renderRegister = (app)=>{
  app.html(regHtml);
  regEvent();
};

export default renderRegister;
