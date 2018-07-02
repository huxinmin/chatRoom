import $ from 'jquery';

const leftEvent = ()=>{
	$(document).on('click', '.menu-item', function(){
		const menuItem = $(".menu-item");
		menuItem.removeClass('active');
		$(this).addClass('active');
		/**  加一点SVG动效，未完成
		  *
		  *
		  */
		const target = $('.'+$(this).attr("data-type")+'-group');
		$('.tabs-group li').removeClass('active');
		target.addClass('active');
	});
}
export default leftEvent
