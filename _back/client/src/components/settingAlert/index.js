import swal from "sweetalert";
import "./index.less";

const settingAlert = ()=>{
  const content = $("<div class='setting-swalt-content'>"
		+"敬请期待</div>")[0];
  swal({
   	button:{
  		text: "x",
  		value: true,
  		visible: true,
  		className: "setting-close",
  		closeModal: true,
    },
    content:content,
   	className:"setting-swalt",
  	title: "设置",
  });
};

export default settingAlert;
