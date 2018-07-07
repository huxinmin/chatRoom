import swal from "sweetalert";
import {setCookie,} from "../utils/cookie";
import {server, ajaxCrossDomainSettings,} from "../config.js";
import homeOnload from "./homeOnload";
//socket
import {emitLoginSocket,} from "../socket/login";


const loginAjax = (data)=>{
  const options = Object.assign({
    type: "post",
    dataType: "json",
    url: server+"/server/login",
    data: data,
  }, ajaxCrossDomainSettings);
  
  $.ajax(options).done((data)=>{
    done(data);
  }).fail((err)=>{
    loginFail("登录失败");
  });
  function done(data){
    if(data.auth){
    	window.locals.mine = data.mine;
    	setCookie("isLogin",true);
      emitLoginSocket(data);
    	swal({
        button:false,
  			text: data.message,
  			icon: "success",
  			timer: 2000,
      }).then(()=>{
        homeOnload();
        page.redirect("/home");
      });
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
  		timer: 3000,
    });
  }
};
export default loginAjax;
