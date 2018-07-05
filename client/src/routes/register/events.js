

const regEvent = ()=>{
	 const options = {
	 	preview: '.img-preview',
   	aspectRatio: 1 / 1,
   	minContainerHeight:100,
   	minContainerWidth:100
  };
	$(document).on('change',"#avaterInput", function(){
		/** 将下面的代码抽出到cropperSwal公用
		  *
		  *
		  *
		  */ 
		if (this.files && this.files.length) {
			var file = this.files[0];
			
			if (/^image\/\w+$/.test(file.type)) {
				var URL = window.URL || window.webkitURL;
				var uploadedImageURL = URL.createObjectURL(file);
				var uploadedImageType = file.type;
        var content = $(
        	"<div>"
        	+  " <div class='img-preview' style='width:100px;height:100px;overflow:hidden;border-radius:50%;'></div>"
        	+"<div class='img-container' style='height:200px;'>"
					+  "<img id='image' src>"
					+"</div></div>")
				 	swal("裁切头像",{
				 		content:content[0],
				 		button:{text:"确定"}
				 	}).then((val)=>{
				 		if(val){
				 			var resultCanvas = $image.cropper('getCroppedCanvas')
      				resultCanvas.toBlob((imgBlob) => {
      					
      					console.log(imgBlob)
      				});
      				$(".register-avater").attr("src",resultCanvas.toDataURL(uploadedImageType))
				 		}
				 	});
  				var $image = $('#image');
  				$image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
      } else {
        swal({
   					button: {
    				text: "确定",
  				},
  				text: "请选择图片",
  				icon: "error",
  				timer: 3000
				});
      }
		}
	});
}

export default regEvent
