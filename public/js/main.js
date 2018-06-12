$(document).ready(function() {
		var win_h = $(window).height(),
				win_w = $(window).width(),
				settingDropMenu = $(".dropdown-menu.menu-group"),
				tabHead = $(".tab-head"),
				tabBody = $(".tab-body");
		//对localstorage的方法进行简单的封装，使得支持json字符串的存储
		var _localStorage = {
				setItem: function(key, value) {
						window.localStorage.setItem(key, JSON.stringify(value));
				},
				getItem: function(key) {
						return JSON.parse(window.localStorage.getItem(key));
				},
				removeItem: function(key) {
						window.localStorage.removeItem(key);
				},
				//只支持二层嵌套数据的json
				//还要限制大小，最多只存储50条信息
				pushItem: function(key, pushkey, value) {
						var itemVal = _localStorage.getItem(key);
						if (pushkey) {
								itemVal[pushkey].push(value);
								limitArrSize(itemVal[pushkey], 50);
						} else {
								itemVal.push(value);
								limitArrSize(itemVal, 50);
						}
						_localStorage.setItem(key, itemVal);
				}
		}
		//限制数组大小，当多插入一个时，就删除第一个
		function limitArrSize(arr, size) {
				if (arr.length > size) {
						arr.shift()
				}
		}
		var chatsBody = $(".chats-body");
		var avater = $(".avater-img");
		var username = $(".user-name");
		var blurBg = $(".blur-bg");
		var emojiHead = $(".emoji-head");
		var emojiBody = $(".emoji-body");
		var message = $(".message");
		var chatBoxBody = $(".chat-box-body");
		var friendsBody = $(".friends-body");
		var nonChatBox = $(".non-chat-box");
		var chatBox = $(".chat-box");
		var client = new WebTorrent();
		var seeds = $("#p2p-files-input");
		var sendFileInput = $("#send-file-input");
		var p2pFiles;
		var jqFileUploadData;
		var sendMessageBtn = $("#sendMessage");
		//实现背景模糊，动态计算background-position
		blurBg.css("background-position", "-" + (win_w * .5 - 500) + "px -" + win_h * .075 + "px");
		//监听document.resize事件动态计算background-position，需要加入throttle函数
		//点击切换设置
		$(".setting-icon").on('click', function(e) {
				e.stopPropagation();
				if (settingDropMenu.css('display') === "none") {
						settingDropMenu.fadeIn();
				} else {
						settingDropMenu.fadeOut();
				}
		});
		settingDropMenu.on('click', function(e) {
				e.stopPropagation();
		});
		$(document).on("click", function(e) {
				settingDropMenu.fadeOut();
				emojiContainer.fadeOut();
		});
		//点击切换聊天好友左侧菜单
		tabHead.on('click', 'i', function(e) {
				tabHead.find('i').removeClass("active");
				$(this).addClass("active");
				tabBody.find("li").removeClass("active");
				$("." + $(this).attr("data-target")).addClass("active");
		});
		//动态生成emoji
		var emojiContainer = $(".emoji-container");
		var emoji1Body = $(".emoji-face1-body");
		var emoji2Body = $(".emoji-face2-body");
		var showEmoj = $(".showEmoj");
		var emoji1Data = [
				{ title: "微笑" }, { title: "撇嘴" }, { title: "色" }, { title: "发呆" }, { title: "得意" }, { title: "流泪" },
				{ title: "害羞" }, { title: "闭嘴" }, { title: "睡" }, { title: "大哭" }, { title: "尴尬" }, { title: "发怒" },
				{ title: "调皮" }, { title: "呲牙" }, { title: "惊讶" }, { title: "难过" }, { title: "酷" }, { title: "冷汗" },
				{ title: "抓狂" }, { title: "吐" }, { title: "偷笑" }, { title: "愉快" }, { title: "白眼" }, { title: "傲慢" },
				{ title: "饥饿" }, { title: "困" }, { title: "惊恐" }, { title: "流汗" }, { title: "憨笑" }, { title: "悠闲" },
				{ title: "奋斗" }, { title: "咒骂" }, { title: "疑问" }, { title: "嘘" }, { title: "晕" }, { title: "疯了" },
				{ title: "衰" }, { title: "骷髅" }, { title: "敲打" }, { title: "再见" }, { title: "擦汗" }, { title: "抠鼻" },
				{ title: "鼓掌" }, { title: "糗大了" }, { title: "左哼哼" }, { title: "右哼哼" }, { title: "哈欠" },
				{ title: "鄙视" }, { title: "委屈" }, { title: "快哭了" }, { title: "阴险" }, { title: "亲亲" }, { title: "可怜" }
		];
		var emoji2Data = [
				{ title: "呵呵" }, { title: "哈哈" }, { title: "吐舌" }, { title: "啊" }, { title: "酷" }, { title: "怒" },
				{ title: "开心" }, { title: "汗" }, { title: "泪" }, { title: "黑线" }, { title: "鄙视" }, { title: "不高兴" },
				{ title: "真棒" }, { title: "钱" }, { title: "疑问" }, { title: "阴险" }, { title: "吐" }, { title: "咦" },
				{ title: "委屈" }, { title: "花心" }, { title: "呼" }, { title: "笑眼" }, { title: "冷" }, { title: "太开心" },
				{ title: "滑稽" }, { title: "勉强" }, { title: "狂汗" }, { title: "乖" }, { title: "睡觉" }, { title: "惊哭" },
				{ title: "升起" }, { title: "惊讶" }, { title: "喷" }
		];
		showEmoj.on('click', function(e) {
				e.stopPropagation();
				if (emojiContainer.css('display') === "none") {
						loadEmoji();
						emojiContainer.fadeIn();
				} else {
						emojiContainer.fadeOut();
				}
		});
		emojiContainer.on('click', function(e) {
				e.stopPropagation();
		});

		function loadEmoji() {
				//如果已经有图片了，则不进行多次加载
				if (emojiContainer.find('.face').length) {
						return
				}
				emoji1Data.forEach(function(item, index) {
						var emojiItem = $("<img src='images/qq/" + (1 + index) + ".gif' title='" + item.title + "'  class='face qq-face'>");
						emoji1Body.append(emojiItem);
				});
				emoji2Data.forEach(function(item, index) {
						var emojiItem = $("<img src='images/tieba/" + (1 + index) + ".png' title='" + item.title + "' class='face tieba-face'>");
						emoji2Body.append(emojiItem);
				});
		}
		//点击emoji-head切换emoji-body

		emojiHead.on('click', 'li', function(e) {
				emojiHead.find("li").removeClass("active");
				$(this).addClass("active");
				emojiBody.find("li").removeClass("active");
				$("." + $(this).attr("data-target")).addClass("active");
		});
		//点击表情添加到输入框中
		emojiContainer.on('click', 'img.face', function() {
				var src = $(this).attr("src");
				var className = $(this).attr("class");
				var value = '<img src="' + src + '" class="message-face ' + className + '" />'
				insertEmoji(message[0], value)
		});
		//此方法有bug,重新取得焦点时，出现在开头
		//找到原因了，是里面的Img不能使用float
		function insertEmoji(field, value) {
				var sel, rang
				field.focus();
				if (window.getSelection) {
						sel = window.getSelection();
						if (sel.getRangeAt && sel.rangeCount) {
								range = sel.getRangeAt(0);
								range.deleteContents();
								var el = document.createElement('div');
								el.innerHTML = value;
								var frag = document.createDocumentFragment(),
										node, lastNode;
								while ((node = el.firstChild)) {
										lastNode = frag.appendChild(node);
								}
								var firstNode = frag.firstChild;
								range.insertNode(frag);

								if (lastNode) {
										range = range.cloneRange();
										range.setStartAfter(lastNode);
										range.collapse(true);
										sel.removeAllRanges();
										sel.addRange(range);
								}
						}
				}
		}

		sendMessageBtn.on('click', function() {
			//如果消息为空则不发送，要过滤图片和空DIV以及换行
				if (!message.html() || (!message.text() && !message.find("img").length)) {
					alertMessage("发送消息不能为空");
					return
				}
				emitSendMessage($(".user-name").text(), $(".avater-img").attr("src"), $(".chat-box-title").text(), message.html(), new Date());
				scrollToBottom();
				sendMessage();
		});
		//一旦发送消息，自动滚动到聊天底部
		function scrollToBottom(){
			var chatWindow = $(".chat-box-body-window.active");
			var scrollHeight = 0;
			chatWindow.find(".single-message").each(function(){
				scrollHeight += parseInt($(this).height()+40)
			});
			chatWindow.scrollTop(scrollHeight);
		}
		//监听键盘enter事件
		message.on("keyup", function(e) {
				if (e.which === 13) {
						sendMessage();
				}
		})
		//发送消息
		function sendMessage() {
				var username = $(".user-name").text();
				var avater = $(".avater-img").attr("src");
				var chatWith = $(".chat-item.active").attr("data-username");
				var time = new Date();
				//如果有p2p文件分享的消息
				if (message.find(".p2p-files-message").length) {
						createSendedP2pMessage(p2pFiles);
				}
				//如果有发送文件的消息
				if(message.find(".send-file-message").length){
					jqFileUploadData.submit();
				}
				//如果有发送文件的消息
				addChatMessage(chatWith, username, avater, message.html(), time, "right");
				createLastChatMessage(chatWith, message.html(), time);
				saveChatHistoryIntoLocalStorage(chatWith, username, message.html(), time);
				clearInputMessage();
		}
		//将聊天记录存储到localStorage中
		function saveChatHistoryIntoLocalStorage(chatWithName, speaker, message, time) {
				var key = "chat_with_" + chatWithName;
				//如果有大图片的话，则把src置为大图片默认图片
				var fakeMessage = $(message).clone();
				fakeMessage.find(".large-img").length && fakeMessage.find(".large-img").remove()
				_localStorage.pushItem(key, 'messages', { speaker: speaker, message: fakeMessage.html(), time: time })
		}
		//将消息显示到对话框中
		function addChatMessage(chatWith, username, avater, message, time, direction) {
				var singleMessage = $("<div class='single-message " + direction + "-message'><div class='inner-message'>" +
						"<div class='single-message-info'><p><span class='single-message-username'>" + username + "</span>" +
						"<span class='single-message-time'>" + formatTime(time) + "</span></p><pre>" + message + "</pre></div>" +
						"<img class='single-message-avater' src='" + avater + "'></div></div>")
				$(".chat-box-body-window[data-username='" + chatWith + "']").append(singleMessage);
				//如果是当前对话窗口，则自动滚动到下一条消息
				scrollNext(singleMessage);
		}

		//自动滚动到聊天窗口的下一条消息
		function scrollNext(singleMessage){
			$(".chat-box-body-window.active").length && $(".chat-box-body-window.active").scrollTop($(".chat-box-body-window.active").scrollTop() + singleMessage.height() + 40);
		}
		//转换为时分秒的日期格式，如果时间不是今天，要显示日期
		function formatTime(time) {
				var now = new Date();
				//不是今天的话，发送日期
				var hoursMinutes = (time.getHours() < 10 ? ("0" + time.getHours()) : time.getHours()) + ":" + (time.getMinutes() < 10 ? ("0" + time.getMinutes()) : time.getMinutes())
				if (now.getMonth() !== time.getMonth() || now.getDate() !== time.getDate()) {
						return time.getMonth() + 1 + "-" + time.getDate() + " " + hoursMinutes
				} else {
						return hoursMinutes
				}
		}
		//发送到对话框后还要清除当前输入框的内容
		function clearInputMessage() {
				message.empty();
		}

		//登录注册切换
		var logRegHead = $(".log-reg-head");
		var logRegBody = $(".log-reg-body");
		logRegHead.on('click', 'p', function() {
				logRegHead.find("p").removeClass("active");
				$(this).addClass('active');
				logRegBody.find("form").removeClass('active');
				$("." + $(this).attr("data-target")).addClass("active");
		});

		//登录功能
		//后期加一个登录验证 不为空 以及后台提示消息
		var host = window.location.host;
		var loginBtn = $("#login");

		loginBtn.on('click', function() {
				var sendLoginData = { username: $("form.login-form").find("[name=username]").val(), password: $("form.login-form").find("[name=password]").val() }
				$.ajax({
						type: "post",
						dataType: "json",
						url: 'http://' + host + '/login',
						data: sendLoginData
				}).done(function(data) {
						loginSuccess(data);
				});
		});

		function alertMessage(str) {
				$("<div class='alert-message'>" + str + "</div>").appendTo($("body")).animate({
						"top": "40px"
				}, function() {
						var _this = this;
						setTimeout(function() {
								$(_this).fadeOut(function() {
										$(_this).remove();
								})
						}, 1000)
				})
		}
		//登录成功后，加载本地localstorage的聊天记录，从服务器获取用户列表和当前在线用户
		function loginSuccess(data) {
				alertMessage(data.message);
				if (!data.isLogin) {
						return
				}
				$(".login-register-container").fadeOut();
				$(".mask").fadeOut();
				createUsernameAvater(data.user);
				friendsBody.empty();
				createFriendsList(data.roomsList, true);
				createFriendsList(data.usersList, false);
				emitLogin();
		}
		//生成用户名和头像
		function createUsernameAvater(user) {
				avater.attr('src', user.avater);
				username.text(user.username);
		}
		//生成左边每次聊天最后的消息
		function createLastChatMessage(chatWith, message, time) {
				var chatItem = $(".chat-item[data-username='" + chatWith + "']");
				chatItem.find(".chat-item-message").html(message);
				chatItem.find(".chat-item-time").text(formatTime(time));
		}
		//生成未读的消息列表
		function createUnreadMessages() {}
		//生成好友列表
		function createFriendsList(list, isRoom) {
				list.forEach(function(item) {
						var friendItem = $("<div class='friend-item' data-isRoom=" + isRoom + " data-avater='" + item.avater + "' data-username='" + item.username + "'><img src='" + item.avater + "'><p>" + item.username + "</p></div>");
						friendsBody.append(friendItem);
				});
		}
		//生成聊天列表，聊天列表只保存在本地locastorage
		function createChatsList(chatsList) {
				if (!chatsList) {
						return
				}
				chatsList.forEach(function(item) {
						createChat(item.username, item.avater, false);
						createChatBoxBodyWindow(item.username);
				});
		}
		createChatsList(_localStorage.getItem('chats'));
		//生成单个聊天，点击用户列表生成一个单个聊天，生成聊天列表的时候也要循环调用该方法
		function createChat(username, avater, isSetLocalStorage) {
				var chatItem = $("<div class='chat-item' data-avater='" + avater + "' data-username='" + username + "'><img src='" + avater + "'><div class='chat-item-info'><p>" + username + "</p><p class='chat-item-message'></p></div><div class='chat-item-time'></div></div>");
				chatsBody.append(chatItem);
				//使用localstorage存储聊天的所有对象
				if (isSetLocalStorage) {
						var originChats = _localStorage.getItem('chats');
						if (!originChats) {
								_localStorage.setItem('chats', [{ username: username, avater: avater }])
						} else {
								_localStorage.pushItem('chats', null, { username: username, avater: avater })
						}
						//存储聊天信息，使用chat_width加上聊天对象名来保存key值
						_localStorage.setItem("chat_with_" + username, { avater: avater, messages: [] });
				}
		}
		//生成和对应用户聊天的聊天窗口
		function createChatBoxBodyWindow(username) {
				chatBoxBody.append("<div class='chat-box-body-window' data-username='" + username + "'></div>");
		}
		//生成历史聊天信息
		function createHistoryChats() {
				var chatsList = _localStorage.getItem('chats');
				if (!chatsList || !chatsList.length) {
						return
				}
				chatsList.forEach((chat) => {
						var chatHistoryItems = _localStorage.getItem("chat_with_" + chat.username);
						if (!chatHistoryItems || !chatHistoryItems.messages || !chatHistoryItems.messages.length) {
								return
						}
						chatHistoryItems.messages.forEach((item) => {
								var speakerAvater, direction;
								if (chat.username === item.speaker) {
										speakerAvater = chatHistoryItems.avater;
										direction = "left";
								} else {
										speakerAvater = $(".avater-img").attr('src');
										direction = 'right';
								}
								addChatMessage(chat.username, item.speaker, speakerAvater, item.message, new Date(item.time), direction);
						});
						var lastMessage = chatHistoryItems.messages[chatHistoryItems.messages.length - 1];
						createLastChatMessage(chat.username, lastMessage.message, new Date(lastMessage.time))
				});
		}
		createHistoryChats();
		//切换聊天窗口
		function changeChatBoxBodyWindow(username) {
				$(".chat-box-body-window").removeClass("active");
				$(".chat-box-body-window[data-username='" + username + "']").addClass("active");
		}
		//生成右边聊天界面

		function craeteChatBox(username) {
				nonChatBox.hide();
				chatBox.show();
				chatBox.find(".chat-box-title").text(username);
		}
		//注册
		var registerBtn = $("#register");

		registerBtn.on('click', function() {
				var sendRegisterData = { username: $("form.register-form").find("[name=username]").val(), password: $("form.register-form").find("[name=password]").val() }
				$.ajax({
						type: "post",
						dataType: "json",
						url: 'http://' + host + '/register',
						data: sendRegisterData
				}).done(function(data) {
						loginSuccess(data);
				});
		});
		//退出登录
		var logoutBtn = $("#logout");
		logoutBtn.on("click", function() {
				$.ajax({
						type: "post",
						dataType: "json",
						url: 'http://' + host + '/logout',
						data: {}
				}).done(function() {
						settingDropMenu.fadeOut();
						$(".login-register-container").fadeIn();
						$(".mask").fadeIn()
						emitLogout();
				})
		});
		//点击好友列表，生成聊天
		$(document).on('click', ".friend-item", function() {
				var dataUsername = $(this).attr("data-username");
				var dataAvater = $(this).attr("data-avater");
				$(".chats-icon").click();
				//如果没有再次添加同一个人的聊天时
				if (!$(".chat-item[data-username='" + dataUsername + "']").length) {
						createChat(dataUsername, dataAvater, true);
						createChatBoxBodyWindow(dataUsername);
				}
				$(".chat-item").removeClass("active");
				$(".chat-item[data-username='" + dataUsername + "']").addClass("active").click();
				craeteChatBox(dataUsername);
				//当前聊天对象
				_localStorage.setItem('currentChat', dataUsername)
		});
		//点击chat-item切换聊天对象
		$(document).on('click', ".chat-item", function() {
				$(".chat-item").removeClass("active");
				$(this).addClass("active");
				craeteChatBox($(this).attr("data-username"));
				changeChatBoxBodyWindow($(this).attr("data-username"));
				//当前聊天对象
				_localStorage.setItem('currentChat', $(this).attr("data-username"));
		});

		/** 下面都是socket
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 */
		var socket = io({ autoConnect: false });
		//有好友上线了
		socket.on("userLogin", function(data) {
				console.log('userLogin')
				console.log(data)
		});
		//好友下线了
		socket.on("userLogout", function(data) {
				console.log('userLogout')
				console.log(data)
		});
		//好友向我发送消息了
		socket.on("userSendMessage", function(data) {
				console.log("userSendMessage")
				console.log(data);
				receiveMessage(data)
		});

		//好友向我发送了P2P分享文件
		socket.on("userSendP2pTorrent", function(data) {
				console.log("userSendP2pTorrent")
				receiveP2pTorrent(data)
		});

		//好友向我发送了文件
		socket.on('userSendFile', function(data){
			console.log("userSendFile")
			receiveSendFile(data);
		});
		function receiveP2pTorrent(data) {
				console.log(data)
				$(".chat-box-body-window[data-username="+data.sender+"]").find(".p2p-files-message.not-seed").append("<span class='pending'>正在获取种子...</span>")
				client.add(data.magnetURI, onAddTorrent)
		}

		function receiveSendFile(data){
			console.log("receiveSendFile")
			console.log(data)
			if(data.receiver !== $('.user-name').text()){
				$(".chat-box-body-window[data-username="+data.receiver+"]").find(".send-file-message.is-uploading")
				.append("<a target='_blank' href='http://" + host + "/download?filePath="+data.filePath+"'  class='send-file-download'>下载</a>")
				.removeClass("is-uploading").addClass('is-uploaded')
			}else{
				$(".chat-box-body-window[data-username="+data.sender+"]").find(".send-file-message.is-uploading")
				.append("<a target='_blank' href='http://" + host + "/download?filePath="+data.filePath+"'  class='send-file-download'>下载</a>")
				.removeClass("is-uploading").addClass('is-uploaded')
			}
		}

		function receiveMessage(data) {
			//如果receiver等于username则不是群聊消息，如果不等则为群聊消息
			if(data.receiver !== $('.user-name').text()){
				console.log("群聊消息")
				var receiverAvater = $(".friends-body").find('div[data-username="'+data.receiver+'"]').attr('data-avater')
				if (!$(".chat-item[data-username='" + data.receiver + "']").length) {
						createChat(data.receiver, receiverAvater, true);
						createChatBoxBodyWindow(data.receiver);
				}
				addChatMessage(data.receiver, data.sender, receiverAvater, data.message, new Date(data.time), "left");
				createLastChatMessage(data.receiver, data.message, new Date(data.time));
				saveChatHistoryIntoLocalStorage(data.receiver, data.sender, data.message, new Date(data.time));
			}else{
				//如果发送消息用户不在聊天列表里，则创建一个聊天列表，并插入到对应的聊天窗口中，并保存到localStorage中，这样刷新后可以重新生成
				//如果是当前正在聊天的对象，且聊天窗口打开的情况，则直接插入
				if (!$(".chat-item[data-username='" + data.sender + "']").length) {
						createChat(data.sender, data.senderAvater, true);
						createChatBoxBodyWindow(data.sender);
				}
				addChatMessage(data.sender, data.sender, data.senderAvater, data.message, new Date(data.time), "left");
				createLastChatMessage(data.sender, data.message, new Date(data.time));
				saveChatHistoryIntoLocalStorage(data.sender, data.sender, data.message, new Date(data.time));
			}
		}
		//打开页面的时候如果没有登陆注册框的话则代表已经登录
		//同理登录成功或注册成功也代表了已经登录
		//点击退出登录按钮则代表已经退出登录
		if ($(".login-register-container").css("display") === "none") {
				emitLogin();
		}

		function emitLogin() {
				socket.open();
				socket.emit('login', { username: $(".user-name").text() });
		}
		//退出登录
		function emitLogout() {
				socket.close();
		}

		//发送P2P分享文件消息
		function emitP2pTorrent(magnetURI, receiver, sender) {
				socket.emit('sendP2pTorrent', { magnetURI: magnetURI, receiver: receiver, sender: sender });
		}

		//发送文件消息
		function emitSendFile(sender, receiver, filePath){
			socket.emit('sendFile', { sender: sender,  receiver: receiver, filePath:filePath });
		}

		//发送消息
		//发送消息有bug，应该还要确认是否发送成功
		//如果发送成功，则给消息加一个成功标志，失败则告诉用户发送失败
		//还要知道是发送给谁的，什么时候发送的，如果是在群里发的以及发送给个人的等
		//还要判断如果是发送文件的话
		function emitSendMessage(sender, senderAvater, receiver, message, time) {
				socket.emit('sendMessage', { sender: sender, senderAvater: senderAvater, receiver: receiver, message: message, time: time });
		}
		//用户注册成功，更新在线用户的user的列表
		//用户如果不在线，头像置灰，发送消息，提示对方不在线，只能发送不超过3条消息，并存储到db.json中
		//如果在线则显示彩色，可以任意发送消息
		//发送消息的时候也要注意，随时判断对方的在线状态，并给出提示

		//使用indexedDB去掉localStorage
		//使用Notification推送通知
		//还有个bug，就是如果本地没有和对方聊天的列表，对方发消息，有错
		//后期使用Lodash进行增强
		//后期使用ES6进行改写
		//使用template.js
		//使用less
		//使用webtorrent
		//在火狐下有些bug
		//使用eslint
		//使用gulp
		//用户离开页面，或者刷新页面的时候，弹出一个对话框，让用户确认
		//emoji懒加载
		//如果本地预览的文件太大，则不用加入Localstorage
		//将db.json分成好几个文件进行存储，比如用户表，房间表，等等这样应该会快点
		//需要给每一个torrent种子或者发送的文件增加一个唯一的dom的属性标志，用来查找dom，不仅仅是is-uploading或者not-seed,这样可以防止出现bug
		//需要消息超过一定数目，删掉看不见的dom

		/** 下面都是webtorrent
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 */
		//制作种子
		client.on('error', function(err) { console.log(err.message) });
		seeds.on('change', function(e) {
				if (message.find(".p2p-files-message").length) {
						alertMessage("一次只能发一个分享");
						return
				}
				p2pFiles = $(this)[0].files[0];
				createSendingP2pMessage(p2pFiles);
		});
		//生成即将要发送的分享种子文件的信息
		function createSendingP2pMessage(p2pFiles) {
				//如果是图片的话则生成图片预览
				if (p2pFiles.type.indexOf("image") >= 0) {
						var filesMessage = $("<p class='p2p-files-message not-seed' data-seedname='" + p2pFiles.name + "'><span>" + p2pFiles.name + "(" + prettierBytes(p2pFiles.size) + ")</span></p>");
						filesMessage.prepend(createImgPreview(p2pFiles));
						message.append(filesMessage);
				} else {
						message.append("<p class='p2p-files-message not-seed' data-seedname='" + p2pFiles.name + "'>" + p2pFiles.name + "(" + prettierBytes(p2pFiles.size) + ")<p>");
				}

		}
		//生成已经发送的分享种子文件的信息
		function createSendedP2pMessage(p2pFiles) {
				client.seed(p2pFiles, onSeedTorrent);
		}
		//生成图片预览
		function createImgPreview(file) {
				var img = $("<img class='p2p-preview-img'>")
				//如果图片过大则给一个大图片的标记
				//如果大于10kb
				if (file.size > 10240) {
						img.addClass("large-img");
				}
				var reader = new FileReader();
				reader.onload = function(e) {
						img.attr('src', e.target.result);
				}
				reader.readAsDataURL(file);
				return img[0]
		}
		//添加种子文件
		function onAddTorrent(torrent) {
				onTorrent(torrent, 'add');
		}
		//做种文件
		function onSeedTorrent(torrent) {
				onTorrent(torrent, 'seed');
		}

		function onTorrent(torrent, status) {
			console.log(torrent)
				torrent.on('error', function(err) { console.log(err.message) });
				//因为这里是异步的延迟函数，可能消息已经发送了，输入框没有内容了才执行
				var p2pMessageItem = $(".chat-box-body").find(".p2p-files-message.not-seed");
				p2pMessageItem.find(".pending").remove();
				var speedEl = $("<div class='p2p-files-speed' data-magnetURI=" + torrent.magnetURI + "></div>").appendTo(p2pMessageItem);
				updateSpeed(speedEl, torrent);
				p2pMessageItem.removeClass("not-seed").addClass("has-seed")
				emitP2pTorrent(torrent.magnetURI, $(".chat-box-title").text(), $(".user-name").text());
				torrent.on('download', () => { updateSpeed(speedEl, torrent) })
				torrent.on('upload', () => { updateSpeed(speedEl, torrent) })
				//如果是做种才生成下载
				if(status === 'add'){
					downloadFile(torrent, p2pMessageItem);
				}
				setInterval(() => { updateSpeed(speedEl, torrent) }, 1000)
		}
		//下载完成torrent种子
		function downloadFile(torrent, container) {
			console.log("downloadFile")
			console.log(torrent)
			//大于400MB则使用流式下载
			if(torrent.files[0].length <= 1024*400*1024 ){
				//使用fileSaver需要种子文件下载完成
				torrent.on('done', function() {
					$("<button class='download-p2p-file' />").text("下载").appendTo(container).on('click',function(){
						createObjectURLDownload(torrent.files[0]);
					});
				});
			}else{
				$("<button class='download-p2p-file' />").text("下载").appendTo(container).on('click',function(){
					createStreamDownload(torrent.files[0]);
				});
			}
		}
		//使用fileSaver创建objectURL的zip下载
		function createObjectURLDownload(file){
			var zip = new JSZip()
			file.getBlob(function (err, blob) {
				zip.file(file.name, blob)
				zip.generateAsync({type : 'blob'})
				.then(function(blob) {
						saveAs(blob, file.name + '.zip');
				})
			});
		}
		//使用streamSaver创建service work的无zip下载
		function createStreamDownload(file){
			let myFile = streamSaver.createWriteStream(file.name, file.length)
			let writer = myFile.getWriter()
			file.createReadStream().on('data', data => writer.write(data)).on('end', () => writer.close())
		}

//更新torrent的速度以及种子数
function updateSpeed(speedEl, torrent) {
		speedEl.html(
				'<b>种子数:</b> ' + torrent.numPeers + ' ' +
				'<b>进度:</b> ' + (100 * torrent.progress).toFixed(1) + '% ' +
				'<b>下载速度:</b> ' + prettierBytes(torrent.downloadSpeed) + '/s ' +
				'<b>上传进度:</b> ' + prettierBytes(torrent.uploadSpeed) + '/s '
		)
}
	//比特转换
	function prettierBytes(num) {
		if (typeof num !== 'number' || isNaN(num)) {
				throw new TypeError('Expected a number, got ' + typeof num)
		}

		var neg = num < 0
		var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

		if (neg) {
				num = -num
		}

		if (num < 1) {
				return (neg ? '-' : '') + num + ' B'
		}

		var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
		num = Number(num / Math.pow(1000, exponent))
		var unit = units[exponent]

		if (num >= 10 || num % 1 === 0) {
				// Do not show decimals when the number is two-digit, or if the number has no
				// decimal component.
				return (neg ? '-' : '') + num.toFixed(0) + ' ' + unit
		} else {
				return (neg ? '-' : '') + num.toFixed(1) + ' ' + unit
		}
	}
	//发送文件
	//使用jquery-file-upload
	sendFileInput.fileupload({
    url: 'http://' + host + '/upload',
    dataType: 'json',
    add:function(e, data){
    	if (message.find(".send-file-message").length) {
				alertMessage("一次只能发一个文件");
				return
			}
			data.formData = {"username":$(".user-name").text()}
			jqFileUploadData = data;
			if(ifFileTooLarge(data.files[0])){
				return
			}
			createSendingFileMessage(data.files[0]);
    },
    done: function (e, data) {
    	var sender = $(".user-name").text();
			var receiver = $(".chat-box-title").text();
     	sendFileSuccess(sender, receiver, data.result);
    },
    progressall: function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      $('.is-uploading .progress-bar').css(
        'width',
        progress + '%'
      );
    }
  })
	//如果文件太大
	function ifFileTooLarge(file){
		//如果文件大于100MB
		if(file.size > 100 * 1024 * 1024){
			alertMessage("文件不能大于100MB");
			return true
		}
	}
	//创建将要发送文件的消息
	function createSendingFileMessage(file){
		//如果是图片的话则生成图片预览
		if (file.type.indexOf("image") >= 0) {
			var filesMessage = $("<div class='send-file-message is-uploading' data-seedname='" + file.name + "'><span>" + file.name + "(" + prettierBytes(file.size) + ")</span><p class='progress-box'><span class='progress-bar'></span></p></div>");
			filesMessage.prepend(createImgPreview(file));
			message.append(filesMessage);
		} else {
			message.append("<div class='send-file-message is-uploading' data-seedname='" + file.name + "'>" + file.name + "(" + prettierBytes(file.size) + ")<p class='progress-box'><span class='progress-bar'></span></p></div>");
		}
	}
	//发送文件成功后
	function sendFileSuccess(sender, receiver, data){
		if(data.uploaded){
			emitSendFile(sender, receiver,  data.filePath);
			//将is-uploading改为uploaded
			$('.single-message-info').find('.is-uploading').removeClass('is-uploading').addClass('is-uploaded')
		}
	}
});
