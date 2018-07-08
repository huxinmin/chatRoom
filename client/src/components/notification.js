const createNotification =	function (title, message, icon){
	var hidden = document.hidden || document.webkitHidden
	//如果在当前页面，则不显示通知
	if(!hidden) return
	/** 还需要判断settinh中的是否显示通知的开关，
	  * 未完待做
	  *
	  */
	let notification = new Notification(title, {
		body:message,
		icon:icon
	})
	setTimeout(function(){notification.close()},5000);
}

export default createNotification