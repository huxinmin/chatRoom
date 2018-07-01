import template from 'template';
import './index.less';


var source = '<li class="middle">'
+'middle'
+'</li>'


const data = {

}
var render = template.compile(source);
var middleHtml = render(data);

export { middleHtml}