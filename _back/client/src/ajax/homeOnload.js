import swal from "sweetalert";
import {setCookie,} from "../utils/cookie";
import {server, ajaxCrossDomainSettings,} from "../config.js";
import {emitLoginSocket,} from "../socket/emit";
import renderRoomsItem from "../components/tabs/rooms/item";
import renderUsersItem from '../components/tabs/users/item';
import renderChatsItem from "../components/tabs/chats/item";
import db from '../utils/db';

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
      renderUsersRoomsChats(data.users, data.rooms);
    }else{
      onloadFail();
    }
	 }
  function renderUsersRoomsChats(users, rooms){
  	const chatsGroup = $(".chats-group");
    rooms.forEach((item)=>{
    		var history = db.get("histories").find({username:item.roomname}).value();
        if(history){
          item.inChat = 'true'
          renderChatsItem(chatsGroup, Object.assign({unread:0,active:'false',type:'room',online:'none'},history))
        }else{
          item.inChat = 'false'
        }
        renderRoomsItem($(".rooms-group"),item);
      })
    users.forEach((item)=>{
    	var history = db.get("histories").find({username:item.username}).value();
        if(history){
          item.inChat = 'true'
          renderChatsItem(chatsGroup,Object.assign({unread:0,active:'false',type:'user',online:item.online},history));
        }else{
          item.inChat = 'false'
        }
        renderUsersItem($(".users-group"),item);
      })
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
