import template from "template";
import "./index.less";


var source = "{{each data val}}"
+  "<div class=\"chats-win-history-item\" data-isMine={{val.isMine}}>"
+    "<div class=\"inner-history-item\">"
+      "<div class=\"history-item-info\">"
+        "<div class=\"history-item-info-message\">{{@ val.message}}</div>"
+        "<div class=\"history-item-info-time\">{{val.time}}</div>"
+      "</div>"
+      "<img src={{val.avater}} class=\"history-item-avater\">"
+    "</div>"
+  "</div>"
+"{{/each}}";

var render = template.compile(source);

const renderHistoryItem = (chatsWin, data)=>{
  /** 渲染的时候需要使用moment.js对时间进行处理
	  * 未完成
	  *
	  */
  var historyItemHtml = render({data:data,});
  chatsWin.append(historyItemHtml);
};

export default renderHistoryItem;
