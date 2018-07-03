// 给users数组每个数据添加inChats是都在聊天列表中的属性
// 如果users中的username在chats中有则该值为true否则为false
const addUsersInChatsPro = (users)=>{
	console.log("addUsersInChatsPro");
	addInChatsPro(users, 'username', 'users');
}

const addRoomsInChatsPro =(rooms)=>{
	console.log("addRoomsInChatsPro");
	addInChatsPro(rooms, 'roomname', 'rooms');
}

function addInChatsPro(arr, key, localsKey){
	localforage.getItem('chats').then((chats, err)=>{
		window.locals[localsKey] = _.map(arr,(item)=>{
			if( (chats === null) || (chats.length === 0)){
				return Object.assign(item, {inChats:false});
			}
			if(_.find(chats,{key:item[key]})){
				return Object.assign(item, {inChats:true});
			}else{
				return Object.assign(item, {inChats:false});
			}
		});
	});
}

export {addUsersInChatsPro, addRoomsInChatsPro}