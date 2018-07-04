localforage.config({
	name: 'chatRoom'
});
//设置初始化值
localforage.setItem('chats',[]);
localforage.setItem('roomChats',[]);
