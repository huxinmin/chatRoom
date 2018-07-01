import template from 'template';
import './index.less';
import {leftHtml} from './left';
import {middleHtml} from './middle';
import {rightHtml} from './right';

var source = '<ul class="home">'
+leftHtml+middleHtml+rightHtml
+'</ul>'


const data = {

}
var render = template.compile(source);
var homeHtml = render(data);

export { homeHtml}