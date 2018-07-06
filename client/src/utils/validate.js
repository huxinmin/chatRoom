import swal from 'sweetalert';
//用户名正则，4到16位（字母，数字，下划线，减号）
const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;

const validate =(text, message)=>{
	if(!uPattern.test(text)){
  	swal({
   		button: {
    		text: "确定",
  		},
  		text:message,
  		icon: "error",
  		timer: 3000
		});
		return false
  }
  return true
}

export default validate
