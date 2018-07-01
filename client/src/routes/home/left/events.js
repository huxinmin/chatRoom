import $ from 'jquery';

const leftEvent = ()=>{
	$(document).on('click', '.menu-item', function(){
		const menuItem = $(".menu-item");
		menuItem.removeClass('active');
		$(this).addClass('active');
	});
}
export default leftEvent