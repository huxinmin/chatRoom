import template from 'template';
import fileSvg from '../../../svg/file';

var source = '<div class="tools-file">'
+ fileSvg
+'</div>'

var render = template.compile(source);

const renderToolFile = (chatsInputTools)=>{
	var fileHtml = render();
	chatsInputTools.append(fileHtml);
}

export default renderToolFile
