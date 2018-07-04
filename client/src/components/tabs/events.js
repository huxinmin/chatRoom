import $ from "jquery";

const tabsEvent = ()=>{
  $(".tabs-group li").on("changTabs", function(e, type){
    $(".tabs-group li").removeClass("active");
    $("."+type+"-group").addClass("active");
  });
  $(document).on("click", ".users-item", ()=>{
  	if($(this).attr("data-online") === "false"){
  		//如果用户离线，则提示，并限制发送数量
  	}
  	if($(this).attr("data-inchat") === "true"){
  		//如果已经在聊天列表中，则直接跳到聊天列表并激活那个聊天
  	}else{
  		//如果不在聊天列表，则需要插入到本地数据库，并且创建聊天，然后跳转到聊天并激活
  		$(this).attr("data-inchat", "true");
  		pushChats($(this), 'users');
  	}
  });
  $(document).on("click", ".rooms-item", ()=>{
  	 /**  这里貌似不用这样写，直接改变curChat即可
  		 *  pushChats也可以写在curChat的setter中
  		 *  未完成
  		 */
  	if($(this).attr("data-inchat") === "true"){
  		//如果已经在聊天列表中，则直接跳到聊天列表并激活那个聊天

  	}else{
  		//如果不在聊天列表，则需要插入到本地数据库，并且创建聊天，然后跳转到聊天并激活
  		$(this).attr("data-inchat", "true");
  		pushChats($(this), 'rooms');
  	}
  });
  function pushChats(wrapper,type){
  	var username = wrapper.children("."+type+"-item-name").text();
  	var avater = wrapper.children("."+type+"-item-avater").attr("src");
  	var item = (type==="users")? "chats":"roomChats";
  	var data = (type==="users")?{username:username,avater:avater}:{roomname:username,avater:avater}
  	localforage.getItem(item).then((chats)=> {
  		chats.push(data);
  		localforage.setItem(item, chats);
  	});
  }
};
export default tabsEvent;
