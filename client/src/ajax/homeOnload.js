import swal from "sweetalert";
import {addUsersInChatsPro, addRoomsInChatsPro,} from "../utils/addInChatsPro";
import {setCookie,} from "../utils/cookie";
import {server, ajaxCrossDomainSettings,} from "../config.js";
import {emitLoginSocket,} from "../socket/emit";

const homeOnload = ()=>{
  const options = Object.assign({
    type: "get",
    dataType: "json",
    url: server+"/server/home",
  },ajaxCrossDomainSettings);
	
  $.ajax(options).done((data)=>{
    done(data);
  }).fail((err)=>{
    onloadFail();
  });
  function done(data){
    emitLoginSocket({username:data.mine.username, avater:data.mine.avater,});
    if(data){
      window.locals.mine = data.mine;
      addRoomsInChatsPro(data.rooms);
      addUsersInChatsPro(data.users);
    }else{
      onloadFail();
    }
	 }
  function onloadFail(messages){
    swal({
      button: {
        text: "确定",
      },
      text: "数据获取失败",
      icon: "error",
      timer: 3000,
    }).then(()=>{
      setCookie("isLogin",false);
      page.redirect("/login");
    });
  }
};
export default homeOnload;
