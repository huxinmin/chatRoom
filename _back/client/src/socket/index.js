import createNotification from "../components/notification";
import {server,} from "../config.js";
import renderHistoryItem from "../components/chatsWin/historyItem";
import renderChatsItem from "../components/tabs/chats/item";
import db from '../utils/db';
import {hisLimit} from '../utils/utils';

const socket = io({autoConnect:false,});

socket.on("recLogin", function(data) {
  createNotification(data.username, "上线了", server+"/"+data.avater);
  console.log(data);
});

socket.on("recLogout", function(data) {
  console.log(data);
});

socket.on("recMessages", (data)=>{
	//聊天界面自动滚动到下一条
	function scrollAuto(){
		$(".chats-window").scrollTop($(".chats-win-history-group").height())
	}
  console.log("recMessages", data);
  //如果发送者与当前curChat的用户名相同，也就是聊天框是激活的，则创建聊天历史记录，并改变lowdb数据，否则只改变数据
  //如果是第一次聊天，也就是没有聊天历史记录,则需要创建chats对话框，并标位未读
  if(window.locals.curChat.username === data.sender.username){
  	const chatsWin = $(".chats-win-history-group");
  	var history = [{isMine:'false',message:data.message,time:data.time,avater:server+"/"+data.sender.avater}];
  	if(data.sender.username === window.locals.mine.username){
  		history[0].isMine = 'true';
  	}
  	renderHistoryItem(chatsWin, history);
  }
  const oneHistory = {
    	sender:data.sender.username,
    	senderAvater:data.sender.avater,
    	receiver:window.locals.mine.username,
    	receiverAvater:window.locals.mine.avater,
    	message:data.message,
    	time:data.time,
    	id:data.id
  }
  if(db.get('histories').find({username:data.sender.username}).value()){
  	db.get('histories').find({username:data.sender.username}).assign({lastMess:data.message,time:data.time, id:data.id, avater:data.sender.avater}).write()
  	var chatsWithHis = db.get("chatsWith").find({username:data.sender.username}).get('histories')
  	chatsWithHis.push(oneHistory).write()
  	//如果历史记录超过100条则去掉第一条
  	if(chatsWithHis.size().value()>hisLimit){
    		chatsWithHis.shift().write()
    }
  }else{
  	const chatsGroup = $(".chats-group");
  	var itemData = {
   			unread:0,
   			type: "user",
   			active:"false",
   			lastMess:data.message,
   			username:data.sender.username,
   			online:'true',
   			avater:server+"/"+data.sender.avater
   		};
  	renderChatsItem(chatsGroup,itemData);
  	db.get('histories').push({username:data.sender.username,avater:data.sender.avater,lastMess:data.message,time:data.time,id:data.id}).write()
  	db.get("chatsWith").push({username:data.sender.username,histories:[oneHistory] }).write()
  }
  scrollAuto();
});

socket.on("recRoomMessages", (data)=>{
	function scrollAuto(){
		$(".chats-window").scrollTop($(".chats-win-history-group").height())
	}
  console.log("recRoomMessages",data);
  if(window.locals.curChat.username === data.receiver){
  	const chatsWin = $(".chats-win-history-group");
  	var history = [{isMine:'false',message:data.message,time:data.time,avater:server+"/"+data.sender.avater}];
  	if(data.sender.username === window.locals.mine.username){
  		history[0].isMine = 'true';
  	}
  	renderHistoryItem(chatsWin, history);
  }
  var receiverAvater;
  $(".rooms-item-name").each(function(){
  	if($(this).text()===data.receiver){
  		receiverAvater = $(this).siblings('.rooms-item-avater').attr("src").substring(server.length+1);
  		console.log('receiverAvater'.receiverAvater)
  	}
  })
  const oneHistory = {
    	sender:data.sender.username,
    	senderAvater:data.sender.avater,
    	receiver:data.receiver,
    	receiverAvater:receiverAvater,
    	message:data.message,
    	time:data.time
  }
  if(db.get('histories').find({username:data.receiver}).value()){
  	db.get('histories').find({username:data.receiver}).assign({lastMess:data.message,time:data.time}).write()
  	db.get("chatsWith").find({username:data.receiver}).get('histories').push(oneHistory).write()
  }else{
  	const chatsGroup = $(".chats-group");
  	var itemData = {
   			unread:0,
   			type: "room",
   			active:"false",
   			lastMess:data.message,
   			username:data.receiver,
   			online:'none',
   			avater:server+"/"+data.sender.avater
   		};
  	renderChatsItem(chatsGroup,itemData);
  	db.get('histories').push({username:data.receiver,avater:receiverAvater,lastMess:data.message,time:data.time}).write()
  	db.get("chatsWith").push({username:data.receiver,histories:[oneHistory] }).write()
  }
  scrollAuto();
});

socket.on("recFileStart", function(data){
	console.log("recFileStart",data)
	var fileMess = $(".chats-window").find('#'+data.contextId);
	var progress = $("<div class='progress'><div class='progress-bar'></div></div>");
  fileMess.append(progress);
});

socket.on("recFileProgress", function(data){
	console.log("recFileProgress",data)
	$('#'+data.id+' .progress .progress-bar').css(
    'width',
    data.progress + '%'
  );
});

socket.on("recFileDone", function(data){
	console.log("recFileDone",data)
	var fileMess = $(".chats-window").find('#'+data.id);
	if(data.isImg){
		fileMess.children("img").attr('src', server+'/file/'+data.url)
	}
	var downloadUrl = $("<a download='"+data.url+"' href='"+server+'/file/'+data.url+"'>下载</a>");
	fileMess.append(downloadUrl).children('span').html("上传完成")
  var message = data.message
  db.get('histories').find({id:data.hid}).assign({lastMess:message}).write()
  db.get('chatsWith').find({username:data.sender.username}).get("histories").find({id:data.hid}).assign({message:message}).write();
});

socket.on("recRoomFileStart", function(data){
	console.log("recRoomFileStart",data)
	var fileMess = $(".chats-window").find('#'+data.contextId);
	var progress = $("<div class='progress'><div class='progress-bar'></div></div>");
  fileMess.append(progress);
});

socket.on("recRoomFileProgress", function(data){
	console.log("recRoomFileProgress",data)
	$('#'+data.id+' .progress .progress-bar').css(
    'width',
    data.progress + '%'
  );
});

socket.on("recRoomFileDone", function(data){
	console.log("recRoomFileDone",data)
	var fileMess = $(".chats-window").find('#'+data.id);
	if(data.isImg){
		fileMess.children("img").attr('src', server+'/file/'+data.url)
	}
	var downloadUrl = $("<a download='"+data.url+"' href='"+server+'/file/'+data.url+"'>下载</a>");
	fileMess.append(downloadUrl).children('span').html("上传完成")
  var message = data.message
  db.get('histories').find({id:data.hid}).assign({lastMess:message}).write()
  db.get('chatsWith').find({username:data.sender.username}).get("histories").find({id:data.hid}).assign({message:message}).write();
});


export default socket;
