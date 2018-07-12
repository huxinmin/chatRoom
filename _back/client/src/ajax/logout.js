import {setCookie,} from "../utils/cookie";
import {server, ajaxCrossDomainSettings,} from "../config.js";
import {emitLogoutSocket,} from "../socket/emit";

const logoutAjax = ()=>{
  const options = Object.assign({
    type: "post",
    dataType: "json",
    url: server+"/server/logout",
  }, ajaxCrossDomainSettings);
  $.ajax(options);
  emitLogoutSocket();
  setCookie("isLogin",false);
  page.redirect("/login");
};

export default logoutAjax;
