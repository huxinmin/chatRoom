import swal from "sweetalert";
import "./index.less";

const avaterCropper = (file, cb)=>{
  if (/^image\/\w+$/.test(file.type)) {
    const options = {
	 		preview: ".img-preview",
  		aspectRatio: 1 / 1,
 		 };
    const URL = window.URL || window.webkitURL;
    const uploadedImageURL = URL.createObjectURL(file);
    const uploadedImageType = file.type;
    var content = $(
        	"<div class='cropper-swal-wrapper'>"
        	+  " <div class='img-preview'></div>"
        	+"<div class='img-container'>"
					+  "<img id='image' src>"
					+"</div></div>");
    swal(
      {
        content:content[0],
        button:{text:"确定",},
      }).then((val)=>{
      if(val){
				 	var resultCanvas = $image.cropper("getCroppedCanvas");
      		resultCanvas.toBlob((imgBlob) => {
          cb(imgBlob);
      		});
      		$(".register-avater").attr("src",resultCanvas.toDataURL(uploadedImageType));
      }
    });
  	var $image = $("#image");
  	$image.cropper("destroy").attr("src", uploadedImageURL).cropper(options);
  } else {
    swal({
   		button: {
    		text: "确定",
  		},
  		text: "请选择图片格式",
  		icon: "error",
  		timer: 3000,
    });
  }

};

export default avaterCropper;
