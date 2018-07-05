import $ from "jquery";
import renderHistoryItem from '../chatsWin/historyItem';
import updateChatsWith from '../../utils/chatsWith';

const chatsInputEvent = ()=>{
	$(document).on("click", ".chats-input-btn", function(){
		const inputCont = $(".chats-input-text");
		if(!inputCont || inputCont.length===0){ return }
		console.log(inputCont)
		const chatsWin = $(".chats-win-history-group");
		const data = [{isMine:"true", message:inputCont.html(), time:'22', avater:window.locals.mine.avater}];
		renderHistoryItem(chatsWin, data);
		inputCont.html("");

		updateChatsWith();
	});
};
export default chatsInputEvent;
