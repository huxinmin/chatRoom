import $ from "jquery";

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
  function calcCurChat(target, type){
    var username = target.children("p").text();
    var avater = target.children("img").attr("src");
    var inChat = target.attr("data-inchat");
    if(type === "users"){
      var online = target.attr("data-online");
      var isRoom = false;
    }else{
      var online = "none";
      var isRoom = true;
    }
    $(".chats-item").attr("data-active", "false");
    window.locals.curChat = {isRoom:isRoom,username:username,avater:avater,online:online, inChat:inChat};
    target.attr("data-inchat", "true");
  }
};
export default tabsEvent;
