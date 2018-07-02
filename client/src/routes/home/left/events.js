import $ from "jquery";

const leftEvent = ()=>{
  $(document).on("click", ".menu-item", function(){
    const menuItem = $(".menu-item");
    menuItem.removeClass("active");
    $(this).addClass("active");
    /**  加一点SVG动效，未完成
		  *
		  *
		  */
    const type =$(this).attr("data-type");
    $(".tabs-group li").trigger("changTabs",[type,]);
  });
};
export default leftEvent;
