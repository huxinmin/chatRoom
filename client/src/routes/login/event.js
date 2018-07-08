import $ from "jquery";
import page from "page";
import loginAjax from "../../ajax/login";
import swal from "sweetalert";
import {getCookie,} from "../../utils/cookie";

const loginEvent = (loginBtn)=>{
  const isLogin = getCookie("isLogin");
  if(isLogin==="true") page.redirect("/home");
  $(document).on("click", loginBtn, ()=>{
  	onLoginBtn();
  });
  $(document).on("keydown", (e)=>{
  	if(e.keyCode === 13){
  		onLoginBtn();
  	}
  });
  function onLoginBtn(){
  	var username = $("#username").val();
  	var password = $("#password").val();
  	if(!username || !password){
  		swal({
   			button: {
    			text: "确定",
  			},
  			text: "用户名或密码不能为空",
  			icon: "error",
  			timer: 3000,
      });
      return;
  	}
  	loginAjax({username:username, password:password,});
  }
};
export default loginEvent;
