import $ from 'jquery';
import page from 'page';

const loginEvent = (loginBtn)=>{
	$(document).on('click', loginBtn, function(){
		page.redirect('/home');
	})
}
export default loginEvent