import swal from 'sweetalert';
import dataURLtoBlob from '../utils/dataURLtoBlob';

const registerAjax = ()=>{
	var data = new FormData();
	data.append("username", $(".register-name").val());
	data.append("password", $(".register-password").val());
	const imgBlob = dataURLtoBlob($(".register-avater").attr("src"));
	data.append("avater", imgBlob);
	$.ajax({
		type: "post",
		dataType: "json",
		url: window.locals.serverHost+"/register",
		xhrFields: {
      withCredentials: true
    },
    contentType: false,
    processData:false,
    crossDomain: true,
		data: data
	}).done((data)=>{
		done(data);
	}).fail((err)=>{
		fail("登录失败");
	});
	function done(data){
		console.log(data)
	}
	function fail(message){}
}

export default registerAjax
