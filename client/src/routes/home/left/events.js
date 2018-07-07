import swal from "sweetalert";
import logoutAjax from "../../../ajax/logout";
import settingAlert from "../../../components/settingAlert";

const leftEvent = ()=>{
  $(".menu-item")[0].classList.add("active");
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
  //退出
  $(document).on("click", ".logout-btn", function(){
  	swal({
      buttons:{
  				cancel: {
    				text: "取消",
    				value: false,
    				visible: true,
    				closeModal: true,
  				},
  				confirm: {
    				text: "确定",
    				value: true,
    				visible: true,
    				closeModal: true,
  			},
      },
  			text: "您确定要退出登录吗？",
  			icon: "warning",
    }).then((val)=>{
      if(val) logoutAjax();
    });
  });
  //设置
  $(document).on("click", ".setting-btn", function(){
  	settingAlert();
  });
};
export default leftEvent;
