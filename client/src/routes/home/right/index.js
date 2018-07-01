import template from 'template';
import './index.less';


var source = '<li class="right">'
+'right'
+'</li>'


const data = {

}
var render = template.compile(source);
var rightHtml = render(data);

export { rightHtml}