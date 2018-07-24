import {server,} from "../../config.js";
import {emitFileSocket, emitRoomFileSocket,} from "../../socket/emit";
import db from '../../utils/db';

const chatsInputToolsEvent = ()=>{
	$('#fileupload').fileupload({
        url: 'url',
        dataType: 'json',
        autoUpload: false,
        maxFileSize: 1000*1000*1000
    }).on('fileuploadadd', function (e, data) {
    	console.log(data)
    }).on('fileuploadprocessalways', function (e, data) {

    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {

    }).on('fileuploadfail', function (e, data) {

    })
};
export default chatsInputToolsEvent;
