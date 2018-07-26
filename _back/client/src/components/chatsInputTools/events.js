import {server,} from "../../config.js";
import {emitFileSocketStart, emitFileSocketProgress,emitFileSocketDone, emitRoomFileSocket,} from "../../socket/emit";
import db from '../../utils/db';

const chatsInputToolsEvent = ()=>{
	$('#fileupload').fileupload({
        url: server+'/server/upload',
        dataType: 'json',
        autoUpload: false,
        maxFileSize: 1000*1000*1000*10
    }).on('fileuploadadd', function (e, data) {
    	console.log('上传文件',data)
    	renderFileMess(data);
    }).on("fileuploadsubmit", function(e, data){
    	console.log("fileuploadsubmit")
    	var fileMess = $('#'+data.contextId);
    	var time = fileMess.parent().siblings(".history-item-info-time").text();
    	data.uploadTime = time;
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
    		var fileMess = $('#'+data.contextId);
    		fileMess.append(downloadUrl).children('span').html("上传完成")
    		var file = data.files[0];
    		var isImg = false;
    		if(/image\/\w+/.test(file.type)){
    			isImg = true;
    			fileMess.children("img").attr('src', server+'/file/'+data.result.url)
    		}
    		var socketMessages = {sender:window.locals.mine,receiver:data.receiver, id:data.contextId,isImg:isImg, url:data.result.url,uploadTime:data.uploadTime};
    		emitFileSocketDone(socketMessages);
    		var message = fileMess.prop('outerHTML')
    		db.get('histories').find({time:data.uploadTime}).assign({lastMess:message}).write()
    		db.get('chatsWith').find({username:data.receiver}).get("histories").find({time:data.uploadTime}).assign({message:message}).write();
    	}
    });
    function renderFileMess(data){
    	//如果是图片则本地生成预览
    	//需要有上传进度
    	//上传完成后，把url地址返回给自己
    	//一旦开始上传，则发送开始上传文件信息给对方，上传完成后再次发送上传完成信息给对方
    	var file = data.files[0];
    	const id = ''+file.lastModified + file.size + new Date().getTime()+Math.floor(Math.random()*1000);
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
        $(".chats-input-btn").click();
        data.submit();
    	}
    }
};
export default chatsInputToolsEvent;
