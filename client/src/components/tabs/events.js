import $ from "jquery";

const tabsEvent = ()=>{
  $(".tabs-group li").on("changTabs", function(e, type){
    $(".tabs-group li").removeClass("active");
    $("."+type+"-group").addClass("active");
  });
  //自己在这里犯了一个错误 ，如果使用箭头函数，则this不是点击的元素而是外面的this
  $(document).on("click", ".users-item", function(){
  	var username = $(this).children(".users-item-name").text();
  	var avater = $(this).children(".users-item-avater").attr("src");
  	var online = $(this).attr("data-online");
  	var inChat = $(this).attr("data-inchat");
  	window.locals.curChat = {isRoom:false,username:username,avater:avater,online:online, inChat:inChat};
  	$(this).attr("data-inchat", "true");
  });
  $(document).on("click", ".rooms-item", function(){
  	$(this).attr("data-inchat", "true");
  	var username = $(this).children(".rooms-item-name").text();
  	var avater = $(this).children(".rooms-item-avater").attr("src");
  	var inChat = $(this).attr("data-inchat");
  	window.locals.curChat = {isRoom:true,username:username,avater:avater,online:"none", inChat:inChat};
  });
};
export default tabsEvent;
