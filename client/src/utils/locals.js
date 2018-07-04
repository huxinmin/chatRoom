import renderUsersItem from "../components/tabs/users/item";
import renderRoomsItem from "../components/tabs/rooms/item";
import renderChatsWin from "../components/chatsWin";
import addCurChatHistories from './addCurChatHistories';


window.locals = {
	_serverHost:'http://127.0.0.1:9000',
	get serverHost(){
		return this._serverHost;
	},
	_mine:{},
	_users:[],
	_rooms:[],
	_curChat:{},
  get mine(){
  	return this._mine
  },
  set mine(data){
  	if(!_.isPlainObject(data)){
  		throw TypeError("locals.mine 赋值必须为一个普通对象");
  	}
  	this._mine = data
  },
  get users(){
  	return this._users
  },
  set users(data){
  	if(!_.isArray(data)){
  		throw TypeError("locals.users 赋值必须为一个数组");
  	}
  	this._users = data
    if(data.length ===0) return
    const usersGroup = $(".users-group");
    data.forEach((item)=>{
      renderUsersItem(usersGroup,item);
    });
  },
  get rooms(){
  	return this._rooms
  },
  set rooms(data){
  	if(!_.isArray(data)){
  		throw TypeError("locals.rooms 赋值必须为一个数组");
  	}
  	this._rooms = data
    if(data.length ===0) return
    const roomsGroup = $(".rooms-group");
    data.forEach((item)=>{
      renderRoomsItem(roomsGroup,item);
    });
  },
  get curChat(){
  	return this._curChat
  },
  set curChat(data){
  	if(!_.isPlainObject(data)){
  		throw TypeError("locals.curChat 赋值必须为一个普通对象");
  	}
  	this._curChat = data;
  	if(data === null || data.length ===0){
  		$(".chats-window-none").show();
  		$(".chats-input-box").hide();
  		return
  	}else{
  		$(".chats-window-none").hide();
  		$(".chats-input-box").show();
  	}
  	/** 如果curChat在chats中，则直接跳转激活
  	  * 不在则先创建一个chat-item，再跳转激活
  	  * 点击chat-item或者users-item rooms-item也可激活这个setter
  	  * 未完成代做
  	  */
    // curChat数据形式为{username:"",avater:"", isRoom:true}
    // data等于从本地chats中查找到username等于curChat的数据的合并
    //注意curChat只获取60条记录，更多的需要再次查询，为了做高效滚动加载
    addCurChatHistories(data, (newVal)=>{
    	const chatsWindowWrapper = $(".chats-window-wrapper");
  		renderChatsWin(chatsWindowWrapper,newVal);
    });
  }
};

