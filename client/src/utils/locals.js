import renderUsersItem from "../components/tabs/users/item";
import renderRoomsItem from "../components/tabs/rooms/item";

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
  	this._curChat = data
  }
};

