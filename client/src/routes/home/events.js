import homeOnload from '../../ajax/homeOnload';
const homeEvent = () => {
		/** 监听关闭页面事件，需要弹窗确认
		 * 监听刷新页面事件，需要弹框确认后再次向服务器请求
		 *
		 */
		$(window).on('beforeunload', (e) => {
			const confirMessage = "您确定要离开此页面么？"
			e.returnValue = confirMessage
			return confirMessage
		});
		$(window).on('load',()=>{
			homeOnload();
		});
};
export default homeEvent;
