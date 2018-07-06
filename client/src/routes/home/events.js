import homeOnload from '../../ajax/homeOnload';
import unloadAlert from '../../utils/unloadAlert';
const homeEvent = () => {
		unloadAlert();
		$(window).on('load',()=>{
			homeOnload();
		});
};
export default homeEvent;
