
const registerAjax = ()=>{
	const data =
	$.ajax({
		type: "post",
		dataType: "json",
		url: window.locals.serverHost+"/register",
		xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
		data: data
	}).done((data)=>{
		done(data);
	}).fail((err)=>{
		fail("登录失败");
	});
	function done(){}
	function fail(){}
}

export default registerAjax
