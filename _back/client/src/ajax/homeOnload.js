import swal from "sweetalert";
import {setCookie,} from "../utils/cookie";
import {server, ajaxCrossDomainSettings,} from "../config.js";
import {emitLoginSocket,} from "../socket/emit";
import renderRoomsItem from "../components/tabs/rooms/item";
import renderUsersItem from '../components/tabs/users/item';
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
      renderUsersRooms(data.users, data.rooms);
    }else{
      onloadFail();
    }
	 }
  function renderUsersRooms(users, rooms){
    rooms.forEach((item)=>{
        if( db.find({username:item.roomname}).value() ){
          item.inChats = 'true'
        }else{
          item.inChats = 'false'
        }
        renderRoomsItem($(".rooms-group"),item);
      })
    users.forEach((item)=>{
        if( db.find({username:item.username}).value() ){
          item.inChats = 'true'
        }else{
          item.inChats = 'false'
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
