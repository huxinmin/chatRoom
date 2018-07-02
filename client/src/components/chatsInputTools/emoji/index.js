import template from 'template';

import emojiSvg from '../../../svg/emoji';

var source = '<div class="tools-emoji">'
+emojiSvg
+'</div>'

var render = template.compile(source);

const renderToolEmoji = (chatsInputTools)=>{
	var toolsEmojiHtml = render();
	chatsInputTools.append(toolsEmojiHtml);
}

export default renderToolEmoji
