import avaterCropper from '../../components/avaterCropper';

const regEvent = ()=>{
	$(document).on('change',"#avaterInput", function(){
		if (this.files && this.files.length) {
			avaterCropper(this.files[0],(imgBlob)=>{
				$(".choose-avater").hide();
			});
		}
	});
}

export default regEvent
