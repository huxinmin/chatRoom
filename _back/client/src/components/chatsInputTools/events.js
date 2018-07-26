import {server,} from "../../config.js";
import {emitFileSocketStart, emitFileSocketProgress,emitFileSocketDone, emitRoomFileSocket,} from "../../socket/emit";
import db from '../../utils/db';
import {createId} from '../../utils/utils';

const chatsInputToolsEvent = ()=>{
	$('#fileupload').fileupload({
        url: server+'/server/upload',
        dataType: 'json',
        autoUpload: false,
        maxFileSize: 1000*1000*1000*10
    }).on('fileuploadadd', function (e, data) {
    	console.log('fileuploadadd',data)
    	renderFileMess(data);
    }).on("fileuploadsubmit", function(e, data){
    	var fileMess = $(".chats-window").find('#'+data.contextId);
    	var hid = fileMess.parents(".chats-win-history-item").attr("data-hid");
    	data.hid = hid;
    	if(data.preview){
    		fileMess.children("img").attr('src', data.preview)
    	}
    	var progress = $("<div class='progress'><div class='progress-bar'></div></div>");
    	fileMess.append(progress);
    	var socketMessages = {sender:window.locals.mine,receiver:data.receiver,id:data.contextId};
    	emitFileSocketStart(socketMessages);
    }).on('fileuploadprogress', function(e, data){
    		console.log('fileuploadprogress',data)
    		var progress = parseInt(data.loaded / data.total * 100, 10);
    		$('#'+data.contextId+' .progress .progress-bar').css(
            'width',
            progress + '%'
        );
        var socketMessages = {sender:window.locals.mine,receiver:data.receiver,progress:progress, id:data.contextId};
    		emitFileSocketProgress(socketMessages);
    }).on('fileuploaddone', function (e, data) {
    	/**
    	*
    	*   需要给每一个聊天信息加一个唯一标识， 不能用time做标识，下面的time都要去掉，改成用id查找更新
    	*
    	*
    	*
    	*
    	*
    	*
    	  *
    	  */
    	console.log("fileuploaddone", data)
    	if(data.result.status){
    		var downloadUrl = $("<a download='"+data.result.url+"' href='"+server+'/file/'+data.result.url+"'>下载</a>");
    		var fileMess = $(".chats-window").find('#'+data.contextId);
    		//如果还在当前窗口，则把对应的dom状态改成已经完成上传，并且加上下载按钮
    		console.log('fileuploaddone')
    		fileMess.append(downloadUrl).children('span').html("上传完成")
    		var file = data.files[0];
    		var isImg = false;
    		if(/image\/\w+/.test(file.type)){
    			isImg = true;
    			fileMess.children("img").attr('src', server+'/file/'+data.result.url)
    			data.html.children("img").attr('src', server+'/file/'+data.result.url)
    		}
    		//这样是怕上传很久，上传完成时不在当前窗口，因而无法获取上传的dom对话
    		data.html.append(downloadUrl.clone()).children('span').html("上传完成");
    		var message = data.html.prop('outerHTML')
    		var socketMessages = {sender:window.locals.mine,receiver:data.receiver, id:data.contextId,isImg:isImg, url:data.result.url,hid:data.hid,message:message};
    		emitFileSocketDone(socketMessages);
    		db.get('histories').find({id:data.hid}).assign({lastMess:message}).write()
    		db.get('chatsWith').find({username:data.receiver}).get("histories").find({id:data.hid}).assign({message:message}).write();
    	}
    });
    function renderFileMess(data){
    	//如果是图片则本地生成预览
    	//需要有上传进度
    	//上传完成后，把url地址返回给自己
    	//一旦开始上传，则发送开始上传文件信息给对方，上传完成后再次发送上传完成信息给对方
    	var file = data.files[0];
    	const id = createId();
    	data.contextId = id;
    	data.receiver = window.locals.curChat.username;
    	var type = file.name.substring( file.name.lastIndexOf('.')+1);
    	data.formData = {id:id, type:type};
    	var context = $("<div class='file-message' id="+id+"/>").appendTo('.chats-input-text');
    	var name = $("<p>"+file.name+"</p>");
    	var thumbnail = '/assets/images/doc.png';
    	//如果是图片
    	if(/image\/\w+/.test(file.type)){
    		var reader = new FileReader();
        reader.onload = function(e){
        	data.preview = e.target.result;
        	renderSubmit();
        }
        reader.readAsDataURL(file);
    	}else{
    		renderSubmit();
    	}
    	function renderSubmit(){
    		context.append(name).append($("<img src="+thumbnail+">")).append($("<span>上传中...</span>"));
    		data.html = context.clone();
        $(".chats-input-btn").click();
        data.submit();
    	}
    }
};
export default chatsInputToolsEvent;
