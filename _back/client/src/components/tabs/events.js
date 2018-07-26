import {server} from '../../config';

const tabsEvent = ()=>{
  $(".tabs-group li").on("changTabs", function(e, type){
    $(".tabs-group li").removeClass("active");
    $("."+type+"-group").addClass("active");
  });
  //自己在这里犯了一个错误 ，如果使用箭头函数，则this不是点击的元素而是外面的this
  $(document).on("click", ".users-item", function(){
    calcCurChat($(this),"users");
  });
  $(document).on("click", ".rooms-item", function(){
    calcCurChat($(this),"rooms");
  });
  $(document).on("click", ".chats-item", function(){
  	const isRoom = $(this).attr("data-type")==="room" ?true:false;
  	const username = $(this).find(".chats-item-username").text();
  	const avater = $(this).children(".chats-item-avater").attr("src").substring(server.length+1);
  	const online = $(this).attr("data-online");
  	window.locals.curChat = {isRoom:isRoom,username:username,avater:avater,online:online, inChat:"true",};
  });
  function calcCurChat(target, type){
    const username = target.children("p").text();
    const avater = target.children("img").attr("src").substring(server.length+1);
    const inChat = target.attr("data-inchat");
    if(type === "users"){
      var online = target.attr("data-online");
      var isRoom = false;
    }else{
      var online = "none";
      var isRoom = true;
    }
    window.locals.curChat = {isRoom:isRoom,username:username,avater:avater,online:online, inChat:inChat,};
    target.attr("data-inchat", "true");
  }
};
export default tabsEvent;
