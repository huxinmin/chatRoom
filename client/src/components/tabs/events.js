import $ from 'jquery';

const tabsEvent = ()=>{
	$('.chats-group').addClass('active');
	$('.tabs-group li').on('changTabs', function(e, type){
		$('.tabs-group li').removeClass('active');
		$('.'+type+'-group').addClass('active');
	});
}
export default tabsEvent
