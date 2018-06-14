var utils = {
		//qq表情
		qqEmojis: {
				emojis: [
						{ title: "微笑" }, { title: "撇嘴" }, { title: "色" }, { title: "发呆" }, { title: "得意" }, { title: "流泪" },
						{ title: "害羞" }, { title: "闭嘴" }, { title: "睡" }, { title: "大哭" }, { title: "尴尬" }, { title: "发怒" },
						{ title: "调皮" }, { title: "呲牙" }, { title: "惊讶" }, { title: "难过" }, { title: "酷" }, { title: "冷汗" },
						{ title: "抓狂" }, { title: "吐" }, { title: "偷笑" }, { title: "愉快" }, { title: "白眼" }, { title: "傲慢" },
						{ title: "饥饿" }, { title: "困" }, { title: "惊恐" }, { title: "流汗" }, { title: "憨笑" }, { title: "悠闲" },
						{ title: "奋斗" }, { title: "咒骂" }, { title: "疑问" }, { title: "嘘" }, { title: "晕" }, { title: "疯了" },
						{ title: "衰" }, { title: "骷髅" }, { title: "敲打" }, { title: "再见" }, { title: "擦汗" }, { title: "抠鼻" },
						{ title: "鼓掌" }, { title: "糗大了" }, { title: "左哼哼" }, { title: "右哼哼" }, { title: "哈欠" },
						{ title: "鄙视" }, { title: "委屈" }, { title: "快哭了" }, { title: "阴险" }, { title: "亲亲" }, { title: "可怜" }
				],
				type: 'qq',
				imgType: '.gif'
		},
		//贴吧表情
		tiebaEmojis: {
				emojis: [
						{ title: "呵呵" }, { title: "哈哈" }, { title: "吐舌" }, { title: "啊" }, { title: "酷" }, { title: "怒" },
						{ title: "开心" }, { title: "汗" }, { title: "泪" }, { title: "黑线" }, { title: "鄙视" }, { title: "不高兴" },
						{ title: "真棒" }, { title: "钱" }, { title: "疑问" }, { title: "阴险" }, { title: "吐" }, { title: "咦" },
						{ title: "委屈" }, { title: "花心" }, { title: "呼" }, { title: "笑眼" }, { title: "冷" }, { title: "太开心" },
						{ title: "滑稽" }, { title: "勉强" }, { title: "狂汗" }, { title: "乖" }, { title: "睡觉" }, { title: "惊哭" },
						{ title: "升起" }, { title: "惊讶" }, { title: "喷" }
				],
				type: 'tieba',
				imgType: '.png'
		},
		//表情模板
		emojiTemplate: '{{each emojis value i}}' +
				'<img src="images/{{type}}/{{i+1}}{{imgType}}" title="{{value.title}}" class="face {{type}}-face">' +
				'{{/each}}',
		//限制数组大小，当多插入一个时，就删除第一个
		limitArrSize: function(arr, size) {
				if (arr.length > size) {
						arr.shift()
				}
		},
		//对localstorage的方法进行简单的封装，使得支持json字符串的存储
		_localStorage: {
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
						var itemVal = utils._localStorage.getItem(key);
						if (pushkey) {
								itemVal[pushkey].push(value);
								utils.limitArrSize(itemVal[pushkey], 50);
						} else {
								itemVal.push(value);
								utils.limitArrSize(itemVal, 50);
						}
						utils._localStorage.setItem(key, itemVal);
				}
		},
		//向输入框中插入emoji
		insertEmoji: function(field, value) {
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
		},
		//转换为时分秒的日期格式，如果时间不是今天，要显示日期
		formatTime: function(time) {
				var now = new Date();
				//不是今天的话，发送日期
				var hoursMinutes = (time.getHours() < 10 ? ("0" + time.getHours()) : time.getHours()) + ":" + (time.getMinutes() < 10 ? ("0" + time.getMinutes()) : time.getMinutes())
				if (now.getMonth() !== time.getMonth() || now.getDate() !== time.getDate()) {
						return time.getMonth() + 1 + "-" + time.getDate() + " " + hoursMinutes
				} else {
						return hoursMinutes
				}
		},
		//比特转换
		prettierBytes: function(num) {
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
}
