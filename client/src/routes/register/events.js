import avaterCropper from '../../components/avaterCropper';
import swal from 'sweetalert';
import validate from '../../utils/validate';
import registerAjax from '../../ajax/register';

const regEvent = ()=>{
	$(document).on('change',"#avaterInput", function(){
		if (this.files && this.files.length) {
			avaterCropper(this.files[0],(imgBlob)=>{
				$(".choose-avater").hide();
			});
		}
	});
	$(document).on('click', '.register-confirm-btn', function(){
		const valid = validateAvater()&&validateUsername($(".register-name").val())&&validatePassword($(".register-password").val())&&validateCfPassword($(".register-password").val(),$(".register-cfPassword").val());
		if(valid){
			registerAjax();
		}
	});
	$(document).on("blur", ".register-name", function(){
		validateUsername($(this).val());

	});
	$(document).on("blur", ".register-password", function(){
		validatePassword($(this).val());
	});
	$(document).on("blur", ".register-cfPassword", function(){
		const password = $(".register-password").val();
		const cfPassword = $(this).val();
		validateCfPassword(password, cfPassword);
	});
	function validateUsername(val){
		return validate(val,"用户名不符合规则，4到16位字母，数字，下划线，减号");
	}
	function validatePassword(val){
		return validate(val,"密码不符合规则，4到16位字母，数字，下划线，减号");
	}
	function validateCfPassword(password, cfPassword){
		if(password !== cfPassword){
			swal({
   			button: {
    			text: "确定",
  			},
  			text:"两次密码输入不一致",
  			icon: "error",
  			timer: 3000
			});
			return false
		}
		return true
	}
	function validateAvater(){
		if($(".choose-avater").css("display") ==='block'){
			swal({
   			button: {
    			text: "确定",
  			},
  			text:"您还未选择头像",
  			icon: "error",
  			timer: 3000
			});
			return false
		}
		return true
	}
}

export default regEvent
