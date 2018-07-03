import swal from 'sweetalert';

const loginAjax = (data)=>{
	$.ajax({
		type: "post",
		dataType: "json",
		url: window.locals.serverHost+"/login",
		data: data
	}).done((data)=>{
		done(data);
	}).fail((err)=>{
		loginFail("登录失败");
	});
  function done(data){
    if(data.auth){
    	window.locals.mine = data.mine;
    	window.locals.rooms = data.rooms;
    	window.locals.users = data.users;
    	page.redirect("/home");
    }else{
    	loginFail(data.message);
    }
   }
  function loginFail(messages){
   	swal({
   		button: {
    		text: "确定",
  		},
  		text: messages,
  		icon: "error",
  		timer: 3000
		})
  }
}
export default loginAjax
